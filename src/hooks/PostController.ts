import { gql } from "@apollo/client";

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
          totalCount
        }
      }
      totalCount
    }
  }
`;