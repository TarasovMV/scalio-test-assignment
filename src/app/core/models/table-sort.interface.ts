import {IGithubUser} from './github-user.interface';

export type TableSortDirection = 'asc' | 'desc' | '';
export type TableSortField = keyof IGithubUser;
