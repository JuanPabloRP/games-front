import { UserType } from './user.types';

export interface UserStateType {
	user: UserType;
	loading: boolean;
	error: string;
	message: string;
}
