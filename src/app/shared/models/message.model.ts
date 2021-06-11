import { User } from './user.model';

export interface Message {
  id: number;
  message: string;
  user: User;
  time_stamp: Date;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
  users: User[];
}
