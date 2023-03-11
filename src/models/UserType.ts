import { PostConnection } from "./PostTypes";
import { PageInfo } from "./SchemaGQLTypes";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  posts:PostConnection;
  todos:{nodes:{id:number}[],totalCount:number}
}
 interface UserConnection {
  edges?: UserEdge[];
  nodes: User[];
  pageInfo: PageInfo;
  totalCount: number;
}
interface UserEdge{
  //A cursor for use in pagination.
  cursor: string;
  //The item at the end of the edge.
  node: User;
}
