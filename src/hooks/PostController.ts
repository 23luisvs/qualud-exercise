import { gql } from "@apollo/client";
import * as yup from "yup";

export const showPostsQuantity = (totalPost: number) => {
  if (totalPost === 1) {
    return totalPost + " post";
  }
  return totalPost + " posts";
};
export const showCommentsQuantity = (totalComments: number) => {
  if (totalComments === 1) {
    return totalComments + " comment";
  }
  return totalComments + " comments";
};
//create Post
export const createPostSchema = yup.object({
  title: yup.string().required('Title is a required field'),
  body: yup.string().required('Body is a required field'),
}).required();
export type CreatePostFormData = yup.InferType<typeof createPostSchema>;
export const CREATE_POST = gql`
mutation ($input:createPostInput!){
  createPost(input: $input) {
    post {
        id
        title
    }
  }
}`
//delete post
export const DELETE_POST = gql`
mutation ($input:deletePostInput!){
  deletePost(input: $input) {
    post {
        id
        title
    }
  }
}`
//queries
export const ALL_POSTS = gql`
  query($after: String,$before: String) {
    posts(after:$after,before:$before) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }

      nodes {
        id
        title
        body
        user {
          id
          name
        }
        userId
        comments {
          nodes{
            id
            body
            name
          }
          totalCount
        }
      }
      totalCount
    }
  }
`;