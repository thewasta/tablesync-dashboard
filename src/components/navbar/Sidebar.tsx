/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  BarChart3,
  Boxes,
  ChevronDown,
  FileText,
  HomeIcon,
  LifeBuoy,
  List,
  Monitor,
  Package,
  Plus,
  Send,
  ShoppingCart,
  Users,
} from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

export function SideNavBar() {
  return (
    <>
      <Sidebar className="border-r" collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <SidebarMenuButton asChild>
            <a href="/">
              <Plus /> <h1 className="font-bold text-lg">ACME</h1>
            </a>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <HomeIcon />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <ShoppingCart />
                      <span>TPV</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Catálogo</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/catalog/products">
                    <Package />
                    <span>Productos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <List />
                    <span>Categorías</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <FileText />
                    <span>Carta Digital</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Pedidos</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Package />
                    <span>Histórico</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Gestión Establecimiento</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Boxes />
                    <span>Mesas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Users />
                    <span>Usuarios</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Monitor />
                    <span>Pantallas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Análisis</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <BarChart3 />
                    <span>Ventas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <BarChart3 />
                    <span>Inventario</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Ayuda
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive>
                        <a href="#">
                          <LifeBuoy /> <span>Soporte</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <Send /> <span>Feedback</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
