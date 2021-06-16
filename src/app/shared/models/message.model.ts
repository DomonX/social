import { User } from './user.model';

export interface Message {
  id: number;
  message: string;
  user: User;
  time_stamp: Date;
}

export interface MessageJson {
  id: number;
  message: string;
  user_id: number;
  conversation_id: number;
  time_stamp: string;
}

export interface UserConversationJson {
  id: number;
  user_id: number;
  conversation_id: number;
  notification: boolean;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
  users: User[];
  users_connections: UserConversationJson[];
  notify: boolean;
}
