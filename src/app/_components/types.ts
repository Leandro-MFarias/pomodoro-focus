export interface CreateTaskData {
  title: string;
  description: string;
}

export interface DataProps extends CreateTaskData {
  id: number;
}
