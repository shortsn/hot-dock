
export interface INavItem {
  key: string;
  link: string;
}

export interface ILayout {
  alerts: IAlert[];
  subNav: INavItem[];
  sideNav: INavItem[];
}

export type AlertType = 'danger' | 'warning' | 'info' | 'success';

export interface IAlert {
  id: string;
  type: AlertType;
  message: string;
}
