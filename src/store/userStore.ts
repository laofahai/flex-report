import { create } from 'zustand'
import { UserInfo } from '@/types/sso'

interface UserState {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
  clearUser: () => void
  isLoggedIn: boolean
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
  isLoggedIn: false,
}))
