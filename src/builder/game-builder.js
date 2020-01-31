import $ from 'jquery/dist/jquery.min';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { StaticTextWidget } from '../TextWidget/static-text-widget';
import Builder from './builder';
import {
  DEVICE_DISCONNECTED,
  GAME_BACKGROUND_IMG,
  STADIUM_IMG,
} from '../SocketIOClient/constants';
import StaticImageWidget from '../ImageWidget/StaticImageWidget';
import { DisconnectedDeviceBuilder } from './DisconnectedDeviceBuilder';

export class GameBuilder extends Builder {
  constructor() {
    super();
    this._background = null;
    this._stadium = null;
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
    this._stadium = new StaticImageWidget(WINDOW_WIDTH / 2 - (715 / 2), WINDOW_HEIGHT / 2 - (1037 / 2), 715, 1037, STADIUM_IMG);
    this._stadium.domElem.addClass('popup');
    this._stadium.domElem.addClass('stadium-interactive');
    this.rootElement.append(this._stadium.domElem);

    this._text = new StaticTextWidget('TOUCHER POUR EXPLORER', 763, 700, 400, 100, 0, 1, {
      fontSize: 68,
      textAlign: 'center',
      fontWeight: 'bold',
    });
    this._textReverse = new StaticTextWidget('TOUCHER POUR EXPLORER', 763, 177, 400, 100, 180, 1, {
      fontSize: 68,
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
    this.transition(GameBuilder.TRANSITIONS.START);
  }

  static get TRANSITIONS() {
    return {
      START: 'START',
    }
  }

  async transition(transition) {
    switch (transition) {
      case GameBuilder.TRANSITIONS.START:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._text.domElem.fadeIn();
            this._textReverse.domElem.fadeIn();
            resolve();
          }, 400)
        });
      default:
        console.error(`Unknown transition : ${transition}`);
    }
    return Promise.resolve();
  }

  undraw() {
    this._background.domElem.remove();
    this._stadium.domElem.remove();
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
