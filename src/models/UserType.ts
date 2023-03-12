import { PostConnection } from "./PostTypes";
import { PageInfo } from "./SchemaGQLTypes";
import { TodoConnection } from "./TodoTypes";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  posts:PostConnection;
  todos:TodoConnection;
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
