import { ISession } from './session/model';
import { ILocation } from './location/model';

export interface IAppState {
  session: ISession;
  location: ILocation;
}
