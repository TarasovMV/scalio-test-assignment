import {InjectionToken} from '@angular/core';
import {IGithubApi} from '@core/models/github-api.interface';

export const GITHUB_API: InjectionToken<IGithubApi> = new InjectionToken<IGithubApi>('github api');
