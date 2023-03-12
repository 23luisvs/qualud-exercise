import { gql } from "@apollo/client";
import * as yup from "yup";
//create Post
export const createTodoSchema = yup.object({
  title: yup.string().required('Title is a required field')
}).required();
export type CreateTodoFormData = yup.InferType<typeof createTodoSchema>;
export const showDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
export const showTodosQuantity = (totalTodos: number) => {
  if (totalTodos === 1) {
    return totalTodos + " todo";
  }
  return totalTodos + " todos";
};
export const CREATE_TODO = gql`
mutation ($input:createTodoInput!){
  createTodo(input: $input) {
    todo {
        id
        title
        status
        dueOn
    }
  }
}`

