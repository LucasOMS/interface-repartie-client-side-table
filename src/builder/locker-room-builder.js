import $ from 'jquery/dist/jquery.min';
import ImageClicWidget from '../widget/images/image-clic-widget';
import { LOCKER_ROOM_IMG } from '../SocketIOClient/constants';
import Builder from './builder';

export class LockerRoomBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  draw() {
    this._lockerRoomWidget = new ImageClicWidget(767, 21.5, 406, 504, LOCKER_ROOM_IMG);
    this._lockerRoomWidget.domElem.addClass('popup');
    this._lockerRoomWidget.addTo(this.rootElement);
  }
}
