"use client";

import { Navbar, NavbarContent } from "@heroui/react";
import { UserButton } from "@clerk/nextjs";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <Navbar
      disableAnimation
      isBordered
      className="h-12 bg-sidebar"
      maxWidth="full"
    >
      <NavbarContent>
        <SidebarTrigger />
      </NavbarContent>

      <NavbarContent justify="end">
        <UserButton />
      </NavbarContent>
    </Navbar>
  );
}
