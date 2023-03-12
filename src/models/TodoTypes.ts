export interface Todo {
    dueOn: string;
    id: number;
    status: string;
    title: string;
}
export interface TodoConnection { nodes: Todo[]; totalCount: number; }