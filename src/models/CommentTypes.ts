import { Post } from "./PostTypes";
import { PageInfo } from "./SchemaGQLTypes"

export interface CommentConnection {
    //A list of edges.
    edges?: CommentEdge[];
    //A list of nodes.
    nodes?: Comment[];
    //Information to aid in pagination.
    pageInfo?: PageInfo;
    //Total count of items
    totalCount: number;
}
interface CommentEdge {

    //A cursor for use in pagination.
    cursor: string;
    //The item at the end of the edge.
    node: Comment;
}
export interface Comment {
    body: String;
    email: String;
    id: number;
    name: String;
    post: Post;
    postId: number;
}