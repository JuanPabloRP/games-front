import { UserType } from './user.types';

export interface UserStateType {
	user: Partial<UserType>;
	loading: boolean;
	error: string;
	message: string;
}
