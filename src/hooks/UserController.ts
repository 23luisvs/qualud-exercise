import { gql } from "@apollo/client";
export const showUsersQuantity = (totalUsers: number) => {
    if (totalUsers === 1) {
        return totalUsers + " user";
    }
    return totalUsers + " users";
};
export const GET_USER_POSTS_BY_ID = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
      gender
      posts {
          nodes{
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
                        body
                        email
                        id
                        name
                     }
                     totalCount
                 }      
             }
        totalCount
      }
    }
  }
`;
export const ALL_USERS = gql`
  query($after: String,$before: String) {
    users(after:$after,before:$before) {
      nodes {
        id
        name
        email
        gender
        posts {
          totalCount
        }
      }
      pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
    }
      totalCount
    }
  }
`;