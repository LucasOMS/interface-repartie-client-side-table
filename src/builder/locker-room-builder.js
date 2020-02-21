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
import {StaticTextWidget} from '../widget/static-text-widget';

export class LockerRoomBuilder extends Builder {
  constructor() {
    super();
    this.state = 'START';
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
      START: 'START',
      EXPLORING: 'EXPLORING',
    }
  }

  bindEvents() {
  }

  draw() {
    this._lockerRoomWidget = new ImageClicWidget(767, 21.5, 406, 504, LOCKER_ROOM_IMG);
    this._lockerRoomWidget.domElem.addClass('popup');
    this._lockerRoomWidget.addTo(this.rootElement);

    this._text = new StaticTextWidget('TOUCHER POUR EXPLORER', 770, 400, 400, 100, 0, 1, {
      fontSize: 50,
      textAlign: 'center',
      fontWeight: 'bold',
    });
    this._textReverse = new StaticTextWidget('TOUCHER POUR EXPLORER', 770, 77, 400, 100, 180, 1, {
      fontSize: 50,
      textAlign: 'center',
      fontWeight: 'bold',
    });

    // Set classes
    this._text.domElem.addClass('stadium-text');
    this._textReverse.domElem.addClass('stadium-text');
    // Hide elements
    this._text.domElem.hide();
    this._textReverse.domElem.hide();
    // Add to DOM
    this._text.addTo('#app');
    this._textReverse.addTo('#app');

    this.transition(LockerRoomBuilder.TRANSITIONS.START);

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

  async transition(transition) {
    console.log(`Start transition : ${transition} `);
    switch (transition) {
      case LockerRoomBuilder.TRANSITIONS.START:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._text.domElem.fadeIn();
            this._textReverse.domElem.fadeIn();
            resolve();
          }, 400)
        });
      case LockerRoomBuilder.TRANSITIONS.EXPLORING:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._text.domElem.fadeOut();
            this._textReverse.domElem.fadeOut();
            resolve();
          }, 400)
        });
      default:
        console.error(`Unknown transition : ${transition} `);
    }
    return Promise.resolve();
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
