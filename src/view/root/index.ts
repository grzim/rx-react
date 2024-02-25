import { getFilterService, getSortingService, getUsersService, User } from '../../services';
import { getHistoryViewModel, getUsersViewModel } from '../view-models';
import { getUsersServiceModel } from '../../api/users.sm.ts';

export const usersService = getUsersService();
export const filersService = getFilterService();
export const sortingUsersService = getSortingService<User>()

export const useUsersViewModel = getUsersViewModel(usersService, filersService);
export type UsersViewModel = ReturnType<typeof useUsersViewModel>
export const useHistoryViewModel =  getHistoryViewModel(filersService);
export const useUsersServiceModel = getUsersServiceModel(usersService)