import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import ImageClicWidget from '../widget/images/image-clic-widget';
import {
  CLUE_FOUND,
  LOCKER_ROOM_IMG,
  SOCCER_BALL_IMG,
  SOCCER_CLEATS_IMG,
  TAKE_TABLET_WHITE_IMG,
} from '../SocketIOClient/constants';
import Builder from './builder';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { AnotherDeviceActionWidget } from '../widget/another-device-action-widget';

export class LockerRoomBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
      CLUE_FOUND: 'CLUE_FOUND',
    }
  }

  static get ACTIONS() {
    return {
      FINISHED: 'FINISHED',
    }
  }

  bindEvents() {
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, async () => {
        this._addClueOnMap();
        await this.transition(LockerRoomBuilder.TRANSITIONS.CLUE_FOUND);
      });
  }

  draw() {
    this.state = 'START';
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
      }
    }
  }

  _addClueOnMap() {
    if (this.state === 'EXPLORING') {
      this._ball = new ImageElementWidget(1000, 80, 150, 150, 0, 1, SOCCER_BALL_IMG);
      this._ball.domElem.hide();
      this._ball.addTo('#app');
    } else if (this.state === 'STILL_EXPLORING') {
      this._shoes = new ImageElementWidget(1000, 220, 150, 150, 0, 1, SOCCER_CLEATS_IMG);
      this._shoes.domElem.hide();
      this._shoes.addTo('#app');
    }
  }

  async transition(transition) {
    if (transition === LockerRoomBuilder.TRANSITIONS.CLUE_FOUND) {
      return new Promise((resolve) => {
        if (this.state === 'EXPLORING') {
          this._ball.domElem.fadeIn();
          this.state = 'STILL_EXPLORING';
        } else if (this.state === 'STILL_EXPLORING') {
          this._waitingAction.domElem.fadeOut();
          this._shoes.domElem.fadeIn();
          this.state = 'DONE';
          this.emitAction(LockerRoomBuilder.ACTIONS.FINISHED);
        }
        setTimeout(() => {
          resolve();
        }, 400)
      });
    }
    return Promise.resolve();
  }

  undraw() {
    this._lockerRoomWidget.domElem.remove();
    this._ball.domElem.remove();
    this._shoes.domElem.remove();
    this._waitingAction.domElem.remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, () => {
      });
  }
}
