import { gql } from "@apollo/client";

//delete comment
export const DELETE_COMMENT = gql`
mutation ($input:deleteCommentInput!){
  deleteComment(input: $input) {
    comment {
        id
    }
  }
}`