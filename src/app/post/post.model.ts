import { User } from '../user/user.model';

export interface PostJson {
    id: number;
    text: string;
    time_stamp: string;
    creator_id: number;
}

export interface Post extends Omit<PostJson, "creator_id" | "time_stamp"> {
    creator?: User;
    postedDate: Date;
    postedDateStringified: string;
}