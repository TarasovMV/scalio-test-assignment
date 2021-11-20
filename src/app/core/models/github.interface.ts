import {IGithubUser} from './github-user.interface';

export interface IGithubDto {
  pages: number;
  items: IGithubUser[];
}

export interface IGithubResponse {
  incomplete_results: boolean;
  items: IGithubUser[];
  total_count: number;
}
