export interface PostJson {
  id: number;
  text: string;
  time_stamp: string;
  creator_id: number;
}

export interface Post {
  id: number;
  text: string;
  time_stamp: Date;
  creator_id: number;
}
