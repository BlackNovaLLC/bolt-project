export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  username: string;
  avatarUrl?: string;
}

export interface CreateCommentDTO {
  taskId: string;
  content: string;
}