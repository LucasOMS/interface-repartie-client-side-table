import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import ImageClicWidget from '../ImageWidget/image-clic-widget';
import StaticImageWidget from '../ImageWidget/static-image-widget';
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
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import Builder from './builder';

export class GameHomeBuilder extends Builder {
  constructor() {
    super();
    this._background = null;
    this._journal = null;
    this._reverseJournal = null;
    this._launchButton = null;
    this._symbols = null;
    this._reverseSymbols = null;
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
    this._background = new StaticImageWidget(0, 0, 1920, 1080, HOME_BACKGROUND_IMG);
    this._journal = new ImageElementWidget(150, 600, 471, 440, 0, 1, JOURNAL_IMG);
    this._reverseJournal = new ImageElementWidget(100, 50, 471, 440, 0, 1, REVERSE_JOURNAL_IMG);
    this._reverseSymbols = new StaticImageWidget(1200, 50, 301, 322, REVERSE_SYMBOLS_IMG);
    this._symbols = new StaticImageWidget(450, 700, 301, 322, SYMBOLS_IMG);
    this._launchButton = new ImageClicWidget(795, 380, 331, 331, LAUNCH_BUTTON_IMG);
    this.widgets.push(this._background);
    this.widgets.push(this._journal);
    this.widgets.push(this._reverseJournal);
    this.widgets.push(this._reverseSymbols);
    this.widgets.push(this._symbols);
    this.widgets.push(this._launchButton);
    this.widgets.push(this._launchButton);
    this.widgets.forEach((widget) => {
      widget.addTo('#app');
    });
    this._launchButton.onClick = () => {
      this.emitAction('LAUNCH_GAME');
    };
  }

  undraw() {
    this.widgets.forEach((widget) => {
      widget.domElem.remove();
    });
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
