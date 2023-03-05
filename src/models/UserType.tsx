export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  posts: {
    totalCount: number;
  };
}
