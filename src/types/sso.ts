export type UserAuthority =
  | 'report:read'
  | 'report:manage'
  | 'report:manage:public'
  | 'excel:read:public'
  | 'data-source:read'
  | 'data-source:manage'
  | 'data-dictionary:read'
  | 'data-dictionary:manage'

export interface UserInfo {
  id: string
  name: string
  authorities?: UserAuthority[]
  authorizedAll?: boolean
  avatar?: string
  email?: string
  mobile?: string
}
