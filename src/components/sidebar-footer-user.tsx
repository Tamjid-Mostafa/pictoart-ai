"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarFooterUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: {
                    flexDirection: "row-reverse",
                  },
                },
              }}
              showName
            />
          </SignedIn>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
