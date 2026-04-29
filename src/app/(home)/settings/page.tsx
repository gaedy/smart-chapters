import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, Lock, Palette, Shield, Target, UserRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Settings() {
  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Settings"
        description="Tune your profile, reading preferences, notifications, and account controls."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <SettingsSection
          title="Profile settings"
          description="Keep your reader identity simple and recognizable."
          icon={UserRound}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Display name
              <Input placeholder="Your name" className="rounded-2xl bg-background" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Email address
              <Input placeholder="you@example.com" className="rounded-2xl bg-background" />
            </label>
          </div>
          <Button className="w-fit rounded-full">Save profile</Button>
        </SettingsSection>

        <SettingsSection
          title="Password & security"
          description="Protect the account that holds your library."
          icon={Lock}
        >
          <SettingsRow
            label="Change password"
            description="Update your password periodically for better account safety."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              Update
            </Button>
          </SettingsRow>
          <SettingsRow
            label="Active sessions"
            description="Review where you are currently signed in."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              Review
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Reading preferences"
          description="Shape the defaults Smart Chapters uses across your shelves."
          icon={Target}
        >
          <SettingsRow
            label="Annual reading goal"
            description="Set the number of books you want to finish this year."
          >
            <Input
              type="number"
              defaultValue={24}
              className="w-28 rounded-full bg-background"
            />
          </SettingsRow>
          <SettingsRow
            label="Default shelf"
            description="Choose where newly added books should land first."
          >
            <select className="h-10 rounded-full border border-input bg-background px-4 text-sm">
              <option>Want to Read</option>
              <option>Currently Reading</option>
            </select>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Theme"
          description="Keep the app warm, readable, and comfortable."
          icon={Palette}
        >
          <SettingsRow
            label="Appearance"
            description="Switch between the soft light palette and the warm dark reading palette."
          >
            <ThemeToggle />
          </SettingsRow>
          <SettingsRow
            label="Compact shelves"
            description="Show tighter book rows when your library grows."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              Off
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Gentle nudges without turning reading into noise."
          icon={Bell}
        >
          <SettingsRow
            label="Reading reminders"
            description="Receive quiet reminders to continue your current book."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              On
            </Button>
          </SettingsRow>
          <SettingsRow
            label="Goal progress"
            description="Get updates when you reach reading milestones."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              On
            </Button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection
          title="Privacy & account"
          description="Manage account-level actions from one clear place."
          icon={Shield}
        >
          <SettingsRow
            label="Export library"
            description="Download a copy of your books, ratings, and notes."
          >
            <Button variant="ghost" className="rounded-full bg-background">
              Export
            </Button>
          </SettingsRow>
          <SettingsRow
            label="Delete account"
            description="Permanently remove your profile and reading history."
          >
            <Button variant="destructive" className="rounded-full">
              Delete
            </Button>
          </SettingsRow>
        </SettingsSection>
      </div>
    </div>
  );
}
