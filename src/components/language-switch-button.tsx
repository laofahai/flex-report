'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { localesMap, SupportedLocale } from '../../next-intl.config'
import { Languages } from 'lucide-react'
import { usePathname } from '@/i18n/navigation'

export const LanguageSwitchButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { locale: currentLocale } = useParams()

  const handleSwitch = (locale: SupportedLocale) => {
    if (locale === currentLocale) return
    router.replace(`/${locale}${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(localesMap).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() => handleSwitch(locale as SupportedLocale)}
            disabled={locale === currentLocale}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
