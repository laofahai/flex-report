'use client'

import * as React from 'react'
import { LifeBuoy } from 'lucide-react'

import { NavMain } from '@/components/layout/nav-main'
import { NavConfigure } from '@/components/layout/nav-configure'
import { NavSecondary } from '@/components/layout/nav-secondary'
import { NavUser } from '@/components/layout/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import logo from '@/assets/logo.png'

const data = {
  navSecondary: [
    {
      title: 'Support',
      url: 'https://github.com/laofahai/flex-report/issues',
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={'flex flex-col items-start'}>
              <a href={'/'}>
                <img src={logo.src} className={'w-[120px]'} />
              </a>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavConfigure />

        {/*<ClerkFeatureFlag>*/}
        {/*  <OrganizationSwitcher />*/}
        {/*</ClerkFeatureFlag>*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
