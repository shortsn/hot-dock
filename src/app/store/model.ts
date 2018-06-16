import { ISession } from './session/model';
import { ILocation } from './location/model';
import { IData } from './data/model';

export interface IAppState {
  data: IData;
  location: ILocation;
  session: ISession;
}
