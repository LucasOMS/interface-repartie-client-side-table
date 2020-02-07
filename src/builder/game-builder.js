import { DEVICE_DISCONNECTED, EXPLORE_PLACE } from '../SocketIOClient/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import Builder from './builder';
import { DisconnectedDeviceBuilder } from './disconnected-device-builder';
import { ExplorePlaceAsTabletBuilder } from './explore-place-as-tablet-builder';
import { LockerRoomBuilder } from './locker-room-builder';
import { StadiumBuilder } from './stadium-builder';
import { AdidasBuilder } from './adidas-builder';

export class GameBuilder extends Builder {
  constructor() {
    super();
    this._stadium = new StadiumBuilder();
    this._stadium.onAction(StadiumBuilder.ACTIONS.FINISHED, () => {
      this._lockerRoom = new LockerRoomBuilder();
      this._lockerRoom.draw();
      this._lockerRoom.bindEvents();
      this._lockerRoom.onAction(LockerRoomBuilder.ACTIONS.FINISHED, () => {
        this._adidasBuilder = new AdidasBuilder();
        this._adidasBuilder.draw();
      })
    })
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
    SocketIOClient.getInstance()
      .onEvent(EXPLORE_PLACE, () => {
        const replaceTabletBuilder = new ExplorePlaceAsTabletBuilder(2);
        replaceTabletBuilder.draw();
      });
    this._stadium.bindEvents();
  }

  draw() {
    this._stadium.draw();
  }


  undraw() {
    this._stadium.undraw();
  }

  unbindEvents() {
    this._stadium.unbindEvents();
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
