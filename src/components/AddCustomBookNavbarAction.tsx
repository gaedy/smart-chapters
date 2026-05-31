"use client";

import { Plus } from "lucide-react";
import { AddCustomBookDialog } from "./Sidebar/add-custom-book-dialog";

export function AddCustomBookNavbarAction() {
  return (
    <AddCustomBookDialog
      compactOnCollapse={true}
      showTriggerLabel={false}
      triggerIcon={Plus}
      triggerLabel="Add book"
      triggerClassName="mx-0 size-11 justify-center rounded-full bg-foreground px-0 text-muted-foreground hover:bg-foreground-dark hover:text-primary md:h-9 md:w-auto md:px-3"
    />
  );
}
