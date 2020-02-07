import $ from 'jquery/dist/jquery.min';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import { AnotherDeviceActionWidget } from '../widget/another-device-action-widget';
import ImageClicWidget from '../widget/images/image-clic-widget';
import StaticImageWidget from '../widget/images/static-image-widget';
import {
  CLUE_FOUND,
  END_TALK,
  EXPLORE_PLACE,
  GAME_BACKGROUND_IMG,
  NOTE_IMG, REFEREE_IMG,
  STADIUM_IMG,
  TAKE_VR_IMG,
} from '../SocketIOClient/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { StaticTextWidget } from '../widget/static-text-widget';
import Builder from './builder';

export class StadiumBuilder extends Builder {
  constructor() {
    super();
    this.state = 'START';
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
      START: 'START',
      EXPLORING: 'EXPLORING',
      CLUE_FOUND: 'CLUE_FOUND',
      SWIPE_LEFT: 'SWIPE_LEFT',
      FINISH_VR: 'FINISH_VR',
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
        if (this.state === 'EXPLORING') {
          this.state = 'CLUE_FOUND';
          await this.transition(StadiumBuilder.TRANSITIONS.FINISH_VR);
          this._addClueOnTheStadium();
          this.transition(StadiumBuilder.TRANSITIONS.CLUE_FOUND);
        }
      });
    SocketIOClient.getInstance()
      .onEvent(END_TALK, async () => {
        if (this.state === 'CLUE_FOUND') {
          await this.transition(StadiumBuilder.TRANSITIONS.SWIPE_LEFT);
          this.emitAction(StadiumBuilder.ACTIONS.FINISHED);
          this.state = 'DONE';
          this._clue.domElem.removeClass('stadium-interactive');
        }
      });
  }

  draw() {
    this._drawInitialStadium();
    this.transition(StadiumBuilder.TRANSITIONS.START);
  }

  _drawInitialStadium() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG);
    this._background.domElem.addClass('background');
    this.rootElement.append(this._background.domElem);
    this._stadium = new ImageClicWidget(WINDOW_WIDTH / 2 - (715 / 2), WINDOW_HEIGHT / 2 - (1037 / 2), 715, 1037, STADIUM_IMG);
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

    this._stadium.onClick = () => {
      // region Start explore stadium on VR
      if (this.state === 'START') {
        this.state = 'EXPLORING';
        SocketIOClient.getInstance()
          .sendEvent(EXPLORE_PLACE);
        this._text.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
        this._textReverse.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
        this.transition(StadiumBuilder.TRANSITIONS.EXPLORING) // FadeOut text then show take_vr symbol
          .then(() => {
            this._waitingAction = new AnotherDeviceActionWidget(795, 172, 337.66, 620, TAKE_VR_IMG);
            this._waitingAction.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
            this._waitingAction.addTo('#app');
          });
      } else {
        this._referee.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
        this._clue.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
      }
      // endregion
    };

    // Set classes
    this._text.domElem.addClass('stadium-text');
    this._textReverse.domElem.addClass('stadium-text');
    // Hide elements
    this._text.domElem.hide();
    this._textReverse.domElem.hide();
    // Add to DOM
    this._text.addTo('#app');
    this._textReverse.addTo('#app');
  }

  _addClueOnTheStadium() {
    this._clue = new ImageElementWidget(800, 380, 317, 298, 0, 1, NOTE_IMG);
    this._clue.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
    this._clue.domElem.hide();
    this._clue.addTo('#app');
    this._referee = new StaticImageWidget(1180, 450, 156, 234, REFEREE_IMG);
    this._referee.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
    this._referee.domElem.addClass('stadium-interactive');
    this._referee.domElem.hide();
    this._referee.addTo('#app');
  }

  undraw() {
    this._background.domElem.remove();
    this._text.domElem.remove();
    this._textReverse.domElem.remove();
    this._clue.domElem.remove();
    this._referee.domElem.remove();
    this._stadium.domElem.remove();
  }

  async transition(transition) {
    switch (transition) {
      case StadiumBuilder.TRANSITIONS.START:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._text.domElem.fadeIn();
            this._textReverse.domElem.fadeIn();
            resolve();
          }, 400)
        });
      case StadiumBuilder.TRANSITIONS.EXPLORING:
        return new Promise((resolve) => {
          this._text.domElem.fadeOut();
          this._textReverse.domElem.fadeOut();
          setTimeout(() => {
            resolve();
          }, 400)
        });
      case StadiumBuilder.TRANSITIONS.CLUE_FOUND:
        return new Promise((resolve) => {
          this._clue.domElem.fadeIn();
          this._referee.domElem.fadeIn();
          setTimeout(() => {
            resolve();
          }, 400)
        });
      case StadiumBuilder.TRANSITIONS.FINISH_VR:
        this._waitingAction.domElem.fadeOut();
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 750);
        });
      case StadiumBuilder.TRANSITIONS.SWIPE_LEFT:
        return new Promise((resolve) => {
          this._clue.domElem.addClass('stadium-interactive');
          this._stadium.domElem.css('left', '25px');
          this._clue.domElem.css('left', '150px');
          this._referee.domElem.css('left', '600px');
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      default:
        console.error(`Unknown transition : ${transition}`);
    }
    return Promise.resolve();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(END_TALK, () => {
      });
  }
}
