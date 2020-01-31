import $ from 'jquery/dist/jquery.min';
import TUIOManager from 'tuiomanager/core/TUIOManager';
import Builder from './builder';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import {
  DEVICE_CONNECTED,
  DEVICE_DISCONNECTED,
  HOME_BACKGROUND_IMG,
  JOURNAL_IMG,
  LAUNCH_BUTTON_IMG,
  REVERSE_JOURNAL_IMG,
  REVERSE_SYMBOLS_IMG,
  SYMBOLS_IMG,
} from '../SocketIOClient/constants';
import ImageWidget from '../ImageWidget/ImageWidget';

export class GameHomeBuilder extends Builder {
  constructor() {
    super();
    this._background = null;
    this._journal = null;
    this._reverseJournal = null;
    this._launchButton = null;
    this._symbols = null;
    this._reverseSymbols = null;
    this.rootElement = $('#app');
  }

  bindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, (data) => {
        this.internalAction('DEVICE_CONNECTED', data);
      });

    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, (data) => {
        this.internalAction('DEVICE_DISCONNECTED', data);
      });
  }

  draw() {
    this._background = new ImageWidget(0, 0, 1920, 1080, HOME_BACKGROUND_IMG);
    this.rootElement.append(this._background.domElem);
    this._journal = new ImageWidget(1300, 600, 471, 440, JOURNAL_IMG);
    this.rootElement.append(this._journal.domElem);
    this._reverseJournal = new ImageWidget(100, 50, 471, 440, REVERSE_JOURNAL_IMG);
    this.rootElement.append(this._reverseJournal.domElem);
    this._reverseSymbols = new ImageWidget(1200, 50, 301, 322, REVERSE_SYMBOLS_IMG);
    this.rootElement.append(this._reverseSymbols.domElem);
    this._symbols = new ImageWidget(450, 700, 301, 322, SYMBOLS_IMG);
    this.rootElement.append(this._symbols.domElem);
    this._launchButton = new ImageWidget(795, 380, 331, 331, LAUNCH_BUTTON_IMG);
    this._launchButton.onTouchCreation = (touch) => {
      if (this._launchButton.isTouched(touch.x, touch.y)) {
        this.emitAction('LAUNCH_GAME');
      }
    };
    this.rootElement.append(this._launchButton.domElem);
  }

  undraw() {
    if (this._background) {
      TUIOManager.getInstance().removeWidget(this._background);
      $(`#${this._background.id}`).remove();
    }
    if (this._journal) {
      TUIOManager.getInstance().removeWidget(this._journal);
      $(`#${this._journal.id}`).remove();
    }
    if (this._reverseJournal) {
      TUIOManager.getInstance().removeWidget(this._reverseJournal);
      $(`#${this._reverseJournal.id}`).remove();
    }
    if (this._reverseSymbols) {
      TUIOManager.getInstance().removeWidget(this._reverseSymbols);
      $(`#${this._reverseSymbols.id}`).remove();
    }
    if (this._symbols) {
      TUIOManager.getInstance().removeWidget(this._symbols);
      $(`#${this._symbols.id}`).remove();
    }
    TUIOManager.getInstance().removeWidget(this._launchButton);
    $(`#${this._launchButton.id}`).remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, () => {
      });
  }

  internalAction(actionName, data = undefined) {
    switch (actionName) {
      case DEVICE_CONNECTED:
        console.log(`Device connected while playing : ${data.device_type}`);
        break;
      case DEVICE_DISCONNECTED:
        console.log(`Device disconnected while playing : ${data.device_type}`);
        break;
      default:
    }
  }
}

export const GameHomeExternalAction = {
  LAUNCH_GAME: 'LAUNCH_GAME',
};
