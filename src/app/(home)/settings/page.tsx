import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Download, Lock, Palette, Shield, UserRound } from "lucide-react";
import { auth } from "auth";
import { getTrackedBooksWithDetails } from "@/lib/data/book.data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-background p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-full bg-foreground p-3 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 rounded-2xl bg-foreground p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default async function Settings() {
  const session = await auth();
  const books = session?.user?.id
    ? await getTrackedBooksWithDetails(session.user.id)
    : [];
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    user: {
      name: session?.user?.name ?? null,
      email: session?.user?.email ?? null,
    },
    library: books.map((book) => ({
      title: book.title,
      author: book.author,
      genre: book.genre,
      tracking: book.bookTrackings[0] ?? null,
      reviews: book.Review,
    })),
  };
  const exportHref = `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(exportPayload, null, 2)
  )}`;

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Settings"
        description="Tune Smart Chapters so the app feels calm, readable, and yours."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <SettingsSection
          title="Appearance"
          description="Control the visual details that shape your daily reading space."
          icon={Palette}
        >
          <SettingsRow
            label="Theme"
            description="Switch between the soft light palette and the warm dark reading palette."
          >
            <ThemeToggle />
          </SettingsRow>
          <AppearanceSettings />
        </SettingsSection>

        <SettingsSection
          title="Account"
          description="Your reader identity and the account details connected to this library."
          icon={UserRound}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Display name
              <Input
                value={session?.user?.name ?? "Reader"}
                readOnly
                className="rounded-2xl bg-foreground"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Email address
              <Input
                value={session?.user?.email ?? ""}
                readOnly
                className="rounded-2xl bg-foreground"
              />
            </label>
          </div>
          <SettingsRow
            label="Profile details"
            description="Review your account profile, shelves, and reading snapshot."
          >
            <Button asChild variant="ghost" className="rounded-full bg-foreground">
              <Link href="/account">Open account</Link>
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Preferences"
          description="Keep useful app-level actions close without adding noise."
          icon={Download}
        >
          <SettingsRow
            label="Export library"
            description="Download your books, tracking details, ratings, reviews, and notes."
          >
            <Button asChild variant="ghost" className="rounded-full bg-foreground">
              <a href={exportHref} download="smart-chapters-library.json">
                Export
              </a>
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Account safety options that connect to existing authentication flows."
          icon={Lock}
        >
          <SettingsRow
            label="Password"
            description="Password changes are handled through sign-in and account recovery."
          >
            <Button asChild variant="ghost" className="rounded-full bg-foreground">
              <Link href="/sign-in">Open sign in</Link>
            </Button>
          </SettingsRow>
          <SettingsRow
            label="Data privacy"
            description="Export your data before making any account-level changes."
          >
            <Button asChild variant="ghost" className="rounded-full bg-foreground">
              <Link href="/account">Review account</Link>
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Privacy"
          description="Clear, non-destructive controls for your personal reading data."
          icon={Shield}
        >
          <SettingsRow
            label="Local display settings"
            description="Appearance choices are stored only in this browser."
          >
            <span className="rounded-full bg-foreground px-4 py-2 text-sm text-muted-foreground">
              Private
            </span>
          </SettingsRow>
        </SettingsSection>
      </div>
    </div>
  );
}
