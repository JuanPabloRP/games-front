import { GameType } from '../game';
import { USER_ROLE } from './user.constants';

export interface UserType {
	id: number;
	username: string;
	password: string;
	role: USER_ROLE;
	isAuthenticated: boolean;
	//gamesCreated: GameType[];
}
