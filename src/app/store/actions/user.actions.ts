import { createAction, props } from '@ngrx/store';
import { UserType } from 'src/app/configs/user';

// Get game
export const getUser = createAction(
	'[User component] getUser',
	props<{ user: UserType }>()
);
export const getUsersuccess = createAction(
	'[User component] getUserSuccess',
	props<{ message: string }>()
);
export const getUserFailure = createAction(
	'[User component] getUserFailure',
	props<{ error: string }>()
);

// SignIn
export const signIn = createAction(
	'[User component] signIn',
	props<{ user: UserType }>()
);
export const signInsuccess = createAction(
	'[User component] signInSuccess',
	props<{ message: string }>()
);
export const signInFailure = createAction(
	'[User component] signInFailure',
	props<{ error: string }>()
);

// SignUp
export const signUp = createAction(
	'[User component] signUp',
	props<{ user: UserType }>()
);
export const signUpsuccess = createAction(
	'[User component] signUpSuccess',
	props<{ message: string }>()
);
export const signUpFailure = createAction(
	'[User component] signUpFailure',
	props<{ error: string }>()
);

// SignOut
export const signOut = createAction(
	'[User component] signOut',
	props<{ user: UserType }>()
);
export const signOutsuccess = createAction(
	'[User component] signOutSuccess',
	props<{ message: string }>()
);
export const signOutFailure = createAction(
	'[User component] signOutFailure',
	props<{ error: string }>()
);
