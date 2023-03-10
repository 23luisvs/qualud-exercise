import { gql } from "@apollo/client";
import * as yup from "yup";
export const loginSchema = yup.object({
  username: yup.string().required('Username is a required field'),
  password: yup.string().min(6, "Must have 6 characters at least.").required('Password is a required field'),
}).required();
export type LoginFormData = yup.InferType<typeof loginSchema>;
export const showUsersQuantity = (totalUsers: number) => {
  if (totalUsers === 1) {
    return totalUsers + " user";
  }
  return totalUsers + " users";
};
//queries
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

export const fetchUser = async (id: number) => {
  return await fetch("https://gorest.co.in/public/v2/users/" + id,
    { method: "GET", headers: { "Content-Type": "application/json", Authentication: 'Bearer 0f8b90701db4892bff3cd04bde62d025ff54ae8f26aa630ec2eacf2d868c86ff' } });

}
//to use in future
/*const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
      gender
      posts {
        nodes {
          id
        }
        totalCount
      }
      todos {
        nodes {
          id
        }
        totalCount
      }
    }
  }
`;*/
/*getUser({
        variables: {
          id: dataForm.username.toLowerCase() === "padma" ? 897852 : 897852,
        },
      });*/