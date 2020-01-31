import $ from 'jquery/dist/jquery.min';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import Builder from './builder';
import {
  DEVICE_DISCONNECTED,
  GAME_BACKGROUND_IMG,
  LOCKER_ROOM_IMG,
  REFEREE_IMG,
  STADIUM_IMG,
} from '../SocketIOClient/constants';
import StaticImageWidget from '../ImageWidget/StaticImageWidget';
import { DisconnectedDeviceBuilder } from './DisconnectedDeviceBuilder';

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
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, (data) => {
        this.unbindEvents();
        const builder = new DisconnectedDeviceBuilder(data.device_type);
        builder.bindEvents();
        builder.draw();
        builder.onAction(DisconnectedDeviceBuilder.EXTERNAL_ACTION.DISCONNECTED_DEVICE_REACT, () => {
          builder.destroy();
          this.bindEvents();
        });
      });
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
    this._background.domElem.remove();
    this._stadium.domElem.remove();
    this._referee.domElem.remove();
    this._lockerRoom.domElem.remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, () => {
      });
  }
}

export const GameExternalAction = {
  EXPLORE_STADIUM: 'EXPLORE_STADIUM',
  EXPLORE_LOCKER_ROOM: 'EXPLORE_LOCKER_ROOM',
  TALK_WITH_REFEREE: 'TALK_WITH_REFEREE',
};
