import type { Ref } from 'vue'
 export interface AuthState {
    isAuthUser: { value: boolean }
    currentUser: { value: {
      id: number
      username: string
      email: string
      role: string
      balance: number
    } | null }
    fetchUserData: (actualToken:string) => Promise<void>;
  };