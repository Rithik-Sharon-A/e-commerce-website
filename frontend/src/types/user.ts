export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}


