export interface CreateTaskData {
  title: string;
  description: string;
  isCompleted?: boolean
}

export interface DataProps extends CreateTaskData {
  id: string;
}
