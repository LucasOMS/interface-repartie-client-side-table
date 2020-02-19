import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import ImageClicWidget from '../widget/images/image-clic-widget';
import {
  CLUE_FOUND, EXPLORE_PLACE,
  LOCKER_ROOM_IMG,
  TAKE_TABLET_WHITE_IMG,
} from '../utils/constants';
import Builder from './builder';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { AnotherDeviceActionWidget } from '../widget/another-device-action-widget';

export class LockerRoomBuilder extends Builder {
  constructor() {
    super();
    this.state = 'START';
    this.rootElement = $('#app');
  }

  bindEvents() {
  }

  draw() {
    this._lockerRoomWidget = new ImageClicWidget(767, 21.5, 406, 504, LOCKER_ROOM_IMG);
    this._lockerRoomWidget.domElem.addClass('popup');
    this._lockerRoomWidget.addTo(this.rootElement);
    this._lockerRoomWidget.onClick = () => {
      // region Start explore stadium on tablet
      if (this.state === 'START') {
        this.state = 'EXPLORING';
        this._waitingAction = new AnotherDeviceActionWidget(900, 100, 150, 310, TAKE_TABLET_WHITE_IMG);
        this._waitingAction.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
        this._waitingAction.addTo('#app');
        this.emitAction(EXPLORE_PLACE)
      }
    }
  }

  removeWaiting() {
    if (this._waitingAction) {
      this._waitingAction.domElem.remove();
    }
  }

  undraw() {
    this._lockerRoomWidget.domElem.remove();
    this._waitingAction.domElem.remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, () => {
      });
  }
}
