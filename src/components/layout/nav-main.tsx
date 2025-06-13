'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Database } from 'lucide-react'

import { Collapsible } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavMain({
  items,
}: {
  items?: never // 先不用外部 items，直接在组件内写死菜单
}) {
  const t = useTranslations('NavMain')
  const locale = useLocale()
  const menuItems = [
    {
      title: t('datasource'),
      url: `/${locale}/datasource`,
      icon: Database,
      isActive: false,
    },
    {
      title: t('dataDict', { default: 'Data Dictionary' }),
      url: `/${locale}/data-dict`,
      icon: Database,
      isActive: false,
    },
    {
      title: t('excel', { default: 'Excel Designer' }),
      url: `/${locale}/excel`,
      icon: Database,
      isActive: false,
    }
  ]
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('platform')}</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url} className="flex items-center">
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
