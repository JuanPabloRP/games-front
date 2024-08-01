import { createReducer, on } from '@ngrx/store';

import { UserStateType, UserType } from 'src/app/configs/user';
import * as UserActions from '../actions/user.actions';

export const initialState: UserStateType = {
	user: {} as UserType,
	loading: false,
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
	on(UserActions.getUserSuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: false,
		};
	}),
	on(UserActions.getUserFailure, (state, { error }) => {
		return {
			...state,
			loading: false,
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
			loading: false,
			isAuthenticated: true,
		};
	}),
	on(UserActions.signInFailure, (state, { error }) => {
		return {
			...state,
			loading: false,
			error,
		};
	}),

	// Sign Up
	on(UserActions.signUp, (state, { user }) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UserActions.signUpSuccess, (state, { user, message }) => {
		return {
			...state,
			message,
			loading: false,
			user: { ...user, isAuthenticated: true },
		};
	}),
	on(UserActions.signUpFailure, (state, { error }) => {
		return {
			...state,
			loading: false,
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
	on(UserActions.signOutSuccess, (state, { message }) => {
		return {
			...state,
			message,
			loading: false,
			user: { ...state.user, isAuthenticated: false },
		};
	}),
	on(UserActions.signOutFailure, (state, { error }) => {
		return {
			...state,
			loading: false,
			error,
		};
	})
);
