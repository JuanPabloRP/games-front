import { createReducer, on } from '@ngrx/store';

import { UserStateType, UserType } from 'src/app/configs/user';
import * as UserActions from '../actions/user.actions';

export const initialState: UserStateType = {
	user: {} as UserType,
	loading: true,
	error: '',
	message: '',
};

export const userReducer = createReducer(
	initialState,
	// Get user
	on(UserActions.getUser, (state) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UserActions.getUsersuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: true,
		};
	}),
	on(UserActions.getUserFailure, (state, { error }) => {
		return {
			...state,
			loading: true,
			error,
		};
	}),

	// Sign In
	on(UserActions.signIn, (state) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UserActions.signInsuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: true,
			isAuthenticated: true,
		};
	}),
	on(UserActions.signInFailure, (state, { error }) => {
		return {
			...state,
			loading: true,
			error,
		};
	}),

	// Sign Up
	on(UserActions.signUp, (state) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UserActions.signUpsuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: true,
			isAuthenticated: true,
		};
	}),
	on(UserActions.signUpFailure, (state, { error }) => {
		return {
			...state,
			loading: true,
			error,
		};
	}),

	// Sign out
	on(UserActions.signOut, (state) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UserActions.signOutsuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: true,
			isAuthenticated: false,
		};
	}),
	on(UserActions.signOutFailure, (state, { error }) => {
		return {
			...state,
			loading: true,
			error,
		};
	})
);
