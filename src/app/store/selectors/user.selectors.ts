import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserStateType } from 'src/app/configs/user';

export const selectUserState = createFeatureSelector<UserStateType>('user');

export const selectUser = createSelector(
	selectUserState,
	(state: UserStateType) => state.user
);

export const selectIsAuthenticated = createSelector(
	selectUserState,
	(state: UserStateType) => state.user.isAuthenticated
);

export const selectLoading = createSelector(
	selectUserState,
	(state: UserStateType) => state.loading
);

export const selectError = createSelector(
	selectUserState,
	(state: UserStateType) => state.error
);
