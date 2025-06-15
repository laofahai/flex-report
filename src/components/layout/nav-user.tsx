'use client'

import { OrganizationSwitcher, UserButton, useUser } from '@clerk/nextjs'
import { useSidebar } from '@/components/ui/sidebar'
import { ClerkFeatureFlag } from '@/components/clerk-feature-flag'

export function NavUser() {
  const { isMobile } = useSidebar()
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!hasClerk) return null
  // 只有集成 Clerk 时才加载 useUser
  const { user } = useUser()
  const name = user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || ''

  return (
    <ClerkFeatureFlag>
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
    </ClerkFeatureFlag>
  )
}
