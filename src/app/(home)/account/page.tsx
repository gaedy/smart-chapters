"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AccountPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    console.log("Updated Email:", email);

    setIsEditing(false);
  };

  return (
    <div className="flex flex-col font-inter gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">My Account</p>
      </div>

      <Card className="flex h-fit flex-col p-4 gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg">Personal information</p>

          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              className=" bg-foreground hover:bg-background  hover:text-primary cursor-pointer"
              onClick={handleEditToggle}
            >
              Edit
              <PenLine className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className=" bg-foreground hover:bg-background  hover:text-primary cursor-pointer"
              onClick={handleSave}
            >
              Save
              <PenLine className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {/* <Separator /> */}
        <div className="flex gap-2 items-center">
          <div className="w-16 h-16 rounded-full relative">
            <Avatar className="w-16 h-16">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt="User Avatar" />
              ) : (
                <AvatarFallback>
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
              )}
            </Avatar>

            {isEditing && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute cursor-pointer bottom-0 right-0 w-6 h-6 p-0 rounded-full text-xs"
                  >
                    ✎
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change Avatar</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex flex-col">
            <p>{session?.user?.name}</p>
            <p className="text-muted-foreground text-sm">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <Separator />

        <p className="text-lg">Personal Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">First Name</label>
            <Input placeholder="First Name" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Last Name</label>
            <Input placeholder="Last Name" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email Address</label>
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Gender</label>
            <Input placeholder="Gender" />
          </div>
        </div>
      </Card>
    </div>
  );
}
