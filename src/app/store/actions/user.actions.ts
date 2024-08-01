import { createAction, props } from '@ngrx/store';
import { UserType } from 'src/app/configs/user';

// Get game
export const getUser = createAction(
	'[User component] getUser',
	props<{ user: Partial<UserType> }>()
);
export const getUserSuccess = createAction(
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
	props<{ user: Partial<UserType> }>()
);
export const signInSuccess = createAction(
	'[User component] signInSuccess',
	props<{ message: string; user: Partial<UserType> }>()
);
export const signInFailure = createAction(
	'[User component] signInFailure',
	props<{ error: string }>()
);

// SignUp
export const signUp = createAction(
	'[User component] signUp',
	props<{ user: Partial<UserType> }>()
);
export const signUpSuccess = createAction(
	'[User component] signUpSuccess',
	props<{ user: Partial<UserType>; message: string }>()
);
export const signUpFailure = createAction(
	'[User component] signUpFailure',
	props<{ error: string }>()
);

// SignOut
export const signOut = createAction(
	'[User component] signOut',
	props<{ user: Partial<UserType> }>()
);
export const signOutSuccess = createAction(
	'[User component] signOutSuccess',
	props<{ message: string }>()
);
export const signOutFailure = createAction(
	'[User component] signOutFailure',
	props<{ error: string }>()
);
