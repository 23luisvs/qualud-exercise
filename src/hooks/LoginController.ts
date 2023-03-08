import * as yup from "yup";
export const loginSchema = yup.object({
    username: yup.string().required('Username is a required field'),
    password: yup.string().min(6, "Must have 6 characters at least.").required('Password is a required field'),
}).required();
export type LoginFormData = yup.InferType<typeof loginSchema>;

export const fetchUser = async (id: number) => {
    return await fetch("https://gorest.co.in/public/v2/users/" + id,
        { method: "GET", headers: { "Content-Type": "application/json" } });

}