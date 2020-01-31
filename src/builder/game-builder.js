import $ from 'jquery/dist/jquery.min';
import TUIOManager from 'tuiomanager/core/TUIOManager';
import Builder from './builder';
import {
  GAME_BACKGROUND_IMG,
  LOCKER_ROOM_IMG,
  REFEREE_IMG,
  STADIUM_IMG,
} from '../SocketIOClient/constants';
import StaticImageWidget from '../ImageWidget/StaticImageWidget';

export class GameBuilder extends Builder {
  constructor() {
    super();
    this._background = null;
    this._stadium = null;
    this._referee = null;
    this._lockerRoom = null;
    this.rootElement = $('#app');
  }

  bindEvents() {
  }

  draw() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG);
    this.rootElement.append(this._background.domElem);
    this._stadium = new StaticImageWidget(20, 20, undefined, undefined, STADIUM_IMG);
    this.rootElement.append(this._stadium.domElem);
    this._referee = new StaticImageWidget(550, 300, undefined, undefined, REFEREE_IMG);
    this.rootElement.append(this._referee.domElem);
    this._lockerRoom = new StaticImageWidget(730, 20, undefined, undefined, LOCKER_ROOM_IMG);
    this.rootElement.append(this._lockerRoom.domElem);
  }

  undraw() {
    TUIOManager.getInstance().removeWidget(this._background);
    $(`#${this._background.id}`).remove();
    TUIOManager.getInstance().removeWidget(this._stadium);
    $(`#${this._stadium.id}`).remove();
    TUIOManager.getInstance().removeWidget(this._referee);
    $(`#${this._referee.id}`).remove();
    TUIOManager.getInstance().removeWidget(this._lockerRoom);
    $(`#${this._lockerRoom.id}`).remove();
  }

  unbindEvents() {
  }
}

export const GameExternalAction = {
  EXPLORE_STADIUM: 'EXPLORE_STADIUM',
  EXPLORE_LOCKER_ROOM: 'EXPLORE_LOCKER_ROOM',
  TALK_WITH_REFEREE: 'TALK_WITH_REFEREE',
};
