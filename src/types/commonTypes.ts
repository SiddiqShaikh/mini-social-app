// interfaces
export interface IPost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: IAuthor;
  comments: any[];
  _count: { comments: number };
  createdAt: string | Date;
}
export interface IAuthor {
  id: string;
  name: string;
  email: string;
}

// types
export type TRegisterFormData = {
  name: string;
  password: string;
  email: string;
};

export type TLoginFormData = {
  password: string;
  email: string;
};
