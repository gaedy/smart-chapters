"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookPlus, ImagePlus, Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Resolver, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addCustomBookToLibrary } from "@/lib/actions/book.actions";
import { customBookSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar";

type CustomBookFormValues = z.input<typeof customBookSchema>;

const acceptedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];
const maxCoverSize = 1024 * 1024;
const minCoverRatio = 0.58;
const maxCoverRatio = 0.75;

const defaultValues: CustomBookFormValues = {
  title: "",
  subtitle: "",
  author: "",
  contributors: "",
  genre: "",
  description: "",
  pageCount: "" as unknown as number,
  publicationYear: new Date().getFullYear() as unknown as number,
  publisher: "",
  language: "",
  isbn: "",
  coverUrl: "",
  status: "WANT_TO_READ",
  rating: "" as unknown as number,
  tags: "",
  notes: "",
};

const shelfLabels = {
  WANT_TO_READ: "Want to Read",
  READING: "Currently Reading",
  FINISHED: "Finished",
} as const;

export function AddCustomBookDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedCover, setSelectedCover] = React.useState<{
    name: string;
    size: number;
    previewUrl: string;
  } | null>(null);
  const [isSubmitting, startTransition] = React.useTransition();
  const router = useRouter();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const form = useForm<CustomBookFormValues>({
    resolver: zodResolver(customBookSchema) as Resolver<CustomBookFormValues>,
    defaultValues,
  });

  function onSubmit(values: CustomBookFormValues) {
    startTransition(async () => {
      const result = await addCustomBookToLibrary(values);

      if (!result.success) {
        toast.error(result.message ?? "Could not add this book.");
        return;
      }

      toast.success("Custom book added to your library.");
      form.reset(defaultValues);
      setSelectedCover(null);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          title="Add Custom Book"
          aria-label="Add Custom Book"
          className={cn(
            "mx-2 h-9 justify-start rounded-md px-3 shadow-none transition-[width,padding] duration-300",
            isCollapsed && "mx-auto size-9 justify-center px-0",
          )}
        >
          <Plus className="size-4" />
          <span
            className={cn(
              "truncate transition-opacity duration-200",
              isCollapsed && "sr-only opacity-0",
            )}
          >
            Add Custom Book
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] overflow-hidden bg-background p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-2xl lg:max-w-5xl">
        <DialogHeader className="border-b border-border px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="rounded-md bg-theme-accent-soft p-2 text-theme-accent">
              <BookPlus className="size-5" />
            </span>
            <div className="space-y-1">
              <DialogTitle>Add a custom book</DialogTitle>
              <DialogDescription>
                Create a book entry and place it on one of your existing library
                shelves.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-col"
          >
            <div className="scrollbar-overlay max-h-[calc(100dvh-12rem)] overflow-y-auto px-4 py-5 sm:max-h-[calc(100dvh-13rem)] sm:px-6 lg:px-8">
              <div className="grid gap-8">
                <section className="grid gap-5">
                  <div>
                    <h3 className="text-sm font-medium">Book details</h3>
                    <p className="text-sm text-muted-foreground">
                      Required fields establish the library card.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <TextField name="title" label="Book title" required />
                    <TextField name="subtitle" label="Subtitle" optional />
                    <TextField name="author" label="Author" required />
                    <TextField
                      name="contributors"
                      label="Co-author / contributors"
                      optional
                    />
                    <TextField name="genre" label="Genre / category" required />
                    <TextField
                      name="pageCount"
                      label="Number of pages"
                      type="number"
                      min={1}
                      required
                    />
                    <TextField
                      name="publicationYear"
                      label="Publication year"
                      type="number"
                      min={1000}
                      max={new Date().getFullYear() + 1}
                      required
                    />
                    <TextField name="publisher" label="Publisher" optional />
                    <TextField name="language" label="Language" optional />
                    <TextField name="isbn" label="ISBN" optional />
                  </div>

                  <FormField
                    control={form.control}
                    name="coverUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Book avatar / cover image
                          <span className="text-destructive"> *</span>
                        </FormLabel>
                        <FormControl>
                          <div className="grid gap-3">
                            <label
                              htmlFor="custom-book-cover"
                              className={cn(
                                "flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-foreground p-5 text-center transition-colors hover:bg-foreground-dark focus-within:ring-2 focus-within:ring-ring/50",
                                form.formState.errors.coverUrl &&
                                  "border-destructive bg-destructive/5",
                              )}
                            >
                              <span className="rounded-md bg-theme-accent-soft p-2 text-theme-accent">
                                <ImagePlus className="size-5" />
                              </span>
                              <span className="grid gap-1">
                                <span className="text-sm font-medium">
                                  Upload cover image
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  PNG, JPG, WEBP, or GIF up to 1 MB. Portrait
                                  ratio near 2:3.
                                </span>
                              </span>
                              <Input
                                id="custom-book-cover"
                                type="file"
                                accept={acceptedImageTypes.join(",")}
                                className="sr-only"
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];

                                  if (!file) {
                                    field.onChange("");
                                    setSelectedCover(null);
                                    return;
                                  }

                                  const validationErrors: string[] = [];

                                  if (!acceptedImageTypes.includes(file.type)) {
                                    validationErrors.push(
                                      "Use a PNG, JPG, WEBP, or GIF image.",
                                    );
                                  }

                                  if (file.size > maxCoverSize) {
                                    validationErrors.push(
                                      "Cover image must be 1 MB or smaller.",
                                    );
                                  }

                                  if (validationErrors.length > 0) {
                                    field.onChange("");
                                    setSelectedCover(null);
                                    form.setError("coverUrl", {
                                      type: "manual",
                                      message: validationErrors.join(" "),
                                    });
                                    event.target.value = "";
                                    return;
                                  }

                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    const previewUrl = String(reader.result);
                                    const image = new Image();

                                    image.onload = () => {
                                      const ratio =
                                        image.naturalWidth / image.naturalHeight;

                                      if (
                                        ratio < minCoverRatio ||
                                        ratio > maxCoverRatio
                                      ) {
                                        field.onChange("");
                                        setSelectedCover(null);
                                        form.setError("coverUrl", {
                                          type: "manual",
                                          message:
                                            "Use a portrait book-cover image near a 2:3 ratio. Square or landscape images are not accepted.",
                                        });
                                        event.target.value = "";
                                        return;
                                      }

                                      field.onChange(previewUrl);
                                      form.clearErrors("coverUrl");
                                      setSelectedCover({
                                        name: file.name,
                                        size: file.size,
                                        previewUrl,
                                      });
                                    };

                                    image.onerror = () => {
                                      field.onChange("");
                                      setSelectedCover(null);
                                      form.setError("coverUrl", {
                                        type: "manual",
                                        message:
                                          "Could not validate that image. Try another cover file.",
                                      });
                                      event.target.value = "";
                                    };

                                    image.src = previewUrl;
                                  };
                                  reader.onerror = () => {
                                    field.onChange("");
                                    setSelectedCover(null);
                                    form.setError("coverUrl", {
                                      type: "manual",
                                      message:
                                        "Could not read that image. Try another file.",
                                    });
                                    event.target.value = "";
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </label>

                            {selectedCover && (
                              <div className="flex items-center gap-3 rounded-md border border-border bg-foreground p-3">
                                <img
                                  src={selectedCover.previewUrl}
                                  alt=""
                                  className="h-24 w-16 rounded-sm object-cover shadow-sm"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">
                                    {selectedCover.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {(selectedCover.size / 1024).toFixed(0)} KB
                                    selected
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="size-8"
                                  aria-label="Remove selected cover image"
                                  onClick={() => {
                                    field.onChange("");
                                    setSelectedCover(null);
                                  }}
                                >
                                  <X className="size-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          The selected image is saved as the book cover in your
                          library.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description / summary</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            rows={4}
                            className="resize-none bg-foreground"
                            placeholder="A short summary for your library"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <section className="grid gap-5">
                  <div>
                    <h3 className="text-sm font-medium">Library placement</h3>
                    <p className="text-sm text-muted-foreground">
                      Uses the same shelves as the rest of your library.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Library shelf</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full bg-foreground">
                                <SelectValue placeholder="Choose a shelf" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(shelfLabels).map(
                                ([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This controls where the book appears after saving.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <TextField
                      name="rating"
                      label="Personal rating"
                      type="number"
                      min={1}
                      max={5}
                      optional
                    />
                  </div>
                </section>

                <section className="grid gap-5">
                  <div>
                    <h3 className="text-sm font-medium">Optional extras</h3>
                    <p className="text-sm text-muted-foreground">
                      Add only what helps you find or remember the book later.
                    </p>
                  </div>

                  <TextField
                    name="tags"
                    label="Tags"
                    placeholder="research, favorites, gifts"
                    optional
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            rows={3}
                            className="resize-none bg-foreground"
                            placeholder="Private notes, shelf labels, or collection context"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>
            </div>

            <DialogFooter className="border-t border-border px-4 py-4 sm:px-6 lg:px-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Adding
                  </>
                ) : (
                  "Add book"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function TextField({
  name,
  label,
  optional,
  required,
  ...inputProps
}: {
  name: keyof CustomBookFormValues;
  label: string;
  optional?: boolean;
  required?: boolean;
} & Omit<React.ComponentProps<typeof Input>, "name">) {
  const { control } = useFormContext<CustomBookFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
            {optional && (
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                Optional
              </span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              {...field}
              value={String(field.value ?? "")}
              className={cn("bg-foreground", inputProps.className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
