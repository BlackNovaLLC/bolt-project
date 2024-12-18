export type UserRole = 
  | 'Sr. Media Buyer'
  | 'Jr. Media Buyer'
  | 'Sr. Copywriter'
  | 'Jr. Copywriter'
  | 'Lead Creative Designer'
  | 'Jr. Creative Designer'
  | 'Developer'
  | 'Owner';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  created_at: string;
}