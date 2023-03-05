import { User } from "./UserType";

export interface AuthContextType {
  user: User | null;
  login:(username:string,password:string,from:string)=>void;
  logout:()=>void;
}
