export interface UserProfile {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  personal: {
    id: number;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  };
}

