'use client'

import { OrganizationSwitcher, UserButton, useUser } from '@clerk/nextjs'
import { useSidebar } from '@/components/ui/sidebar'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user } = useUser()
  const name = user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || ''

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: 'h-8 w-8 rounded-lg',
            userButtonPopoverCard: 'rounded-lg min-w-56',
            userButtonPopoverActionButton:
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            userButtonPopoverFooter: 'hidden',
            userButtonTrigger: 'flex items-center gap-2',
            userButtonAvatarImage: 'h-8 w-8 rounded-lg',
          },
        }}
      />
      <span className="font-medium text-sm max-w-[120px] truncate" title={name}>
        {name}
      </span>
    </div>
  )
}
