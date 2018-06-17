
export interface INavItem {
  key: string;
  link: string;
}

export interface ILayout {
  error: string;
  subNav: INavItem[];
  sideNav: INavItem[];
}
