import { gql } from "@apollo/client";
import * as yup from "yup";
export const loginSchema = yup.object({
  username: yup.string().required('Username is a required field'),
  password: yup.string().min(6, "Must have 6 characters at least.").required('Password is a required field'),
}).required();
export type LoginFormData = yup.InferType<typeof loginSchema>;

//queries

export const GET_FIRST_USER = gql`
  query {
    users(first: 1) {
      nodes {
        id
        name
        email
        gender
        posts {
          totalCount
        }
        todos {
          totalCount
        }
      }
      totalCount
    }
  }
`;

