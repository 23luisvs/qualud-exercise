import { CommentConnection } from "./CommentTypes";
import { PageInfo } from "./SchemaGQLTypes";
import { User } from "./UserType";


export interface PostConnection {
    edges?: PostEdge[];
    nodes: Post[];
    pageInfo: PageInfo;
    totalCount: number;
}
export interface Post {
    body: string;
    comments: CommentConnection;
    id: number;
    title: string;
    user: User;
    userId: number;
}
interface PostEdge {
    cursor: string;
    node: Post;
}