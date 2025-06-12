import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode } from 'react'

export default async function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <AppSidebar />
        <div className="flex-1 p-8 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
