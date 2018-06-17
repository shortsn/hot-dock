import { ISession } from './session/model';
import { ILocation } from './location/model';
import { IData } from './data/model';
import { IControls } from './controls/model';

export interface IAppState {
  controls: IControls;
  data: IData;
  location: ILocation;
  session: ISession;
}
