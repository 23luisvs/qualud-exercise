import { User } from "./UserType";

export interface AuthContextType {
  user: User | null;
  login:(user:User)=>void;
  logout:()=>void;
}
