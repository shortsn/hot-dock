export interface ILocation {
  router: string;
}

export interface RouterUpdateLocationAction {
  type: '@angular-redux/router::UPDATE_LOCATION';
  payload: string;
}

export function isUpdateLocationAction(arg: any): arg is RouterUpdateLocationAction {
  return arg && arg.type === '@angular-redux/router::UPDATE_LOCATION';
}

