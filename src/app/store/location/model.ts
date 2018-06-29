import { UPDATE_LOCATION } from '@angular-redux/router';

export interface ILocation {
  router: string;
}

export interface RouterUpdateLocationAction {
  type: string;
  payload: string;
}

export function isUpdateLocationAction(arg: any): arg is RouterUpdateLocationAction {
  return arg && arg.type === UPDATE_LOCATION;
}
