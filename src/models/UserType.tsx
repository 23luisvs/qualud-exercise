export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  posts:{nodes:{id:number}[],totalCount:number};
  todos:{nodes:{id:number}[],totalCount:number}
}
