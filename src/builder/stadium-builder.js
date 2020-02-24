import $ from 'jquery/dist/jquery.min';
import {
  WINDOW_HEIGHT,
} from 'tuiomanager/core/constants';
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  AnotherDeviceActionWidget,
} from '../widget/another-device-action-widget';
import ImageClicWidget from '../widget/images/image-clic-widget';
import StaticImageWidget from '../widget/images/static-image-widget';
import {
  EXPLORE_PLACE,
  NOTE_IMG,
  REFEREE_AFTER_IMG,
  REFEREE_IMG,
  STADIUM_ID,
  STADIUM_IMG,
  TAKE_VR_IMG,
} from '../utils/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import {
  StaticTextWidget,
} from '../widget/static-text-widget';
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

  draw() {
    this._drawInitialStadium();
    this.transition(StadiumBuilder.TRANSITIONS.START);
  }

  _drawInitialStadium() {
    this._stadium = new ImageClicWidget(15, WINDOW_HEIGHT / 2 - (1037 / 2), 715, 1037, STADIUM_IMG);
    this._stadium.domElem.addClass('popup');
    this.rootElement.append(this._stadium.domElem);

    this._text = new StaticTextWidget('TOUCHER POUR EXPLORER', 160, 700, 400, 100, 0, 1, {
      fontSize: 68,
      textAlign: 'center',
      fontWeight: 'bold',
    });
    this._textReverse = new StaticTextWidget('TOUCHER POUR EXPLORER', 160, 177, 400, 100, 180, 1, {
      fontSize: 68,
      textAlign: 'center',
      fontWeight: 'bold',
    });

    this._stadium.onClick = () => {
      // region Start explore stadium on VR
      if (this.state === 'START') {
        this.state = 'EXPLORING';
        SocketIOClient.getInstance()
          .sendEvent(EXPLORE_PLACE, {
            id: STADIUM_ID,
          });
        this.transition(StadiumBuilder.TRANSITIONS.EXPLORING) // FadeOut text then show take_vr symbol
          .then(() => {
            this._waitingAction = new AnotherDeviceActionWidget(190, 172, 337.66, 620, TAKE_VR_IMG);
            this._waitingAction.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
            this._waitingAction.addTo('#app');
          });
      } else {
        if (this._referee) this._referee.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
        if (this._clue) this._clue.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
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
    this._clue = new ImageElementWidget(50, 380, 317, 298, 0, 1, NOTE_IMG);
    this._clue.domElem.hide();
    this._clue.addTo(this.rootElement);
    this._referee = new StaticImageWidget(600, 430, 156, 234, REFEREE_IMG);
    this._referee.domElem.css('z-index', ElementWidget.zIndexGlobal + 1);
    this._referee.domElem.hide();
    this._referee.addTo('#app');
  }

  undraw() {
    if (this._background) this._background.domElem.remove();
    if (this._text) this._text.domElem.remove();
    if (this._textReverse) this._textReverse.domElem.remove();
    if (this._supporter) this._supporter.domElem.remove();
    if (this._clue) this._clue.domElem.remove();
    if (this._referee) this._referee.domElem.remove();
    if (this._stadium) this._stadium.domElem.remove();
    if (this._waitingAction) this._waitingAction.domElem.remove();
  }

  undrawText() {
    if (this._text) {
      this._text.domElem.remove();
      TUIOManager.getInstance()
        .removeWidget(this._text);
    }
    if (this._textReverse) {
      this._textReverse.domElem.remove();
      TUIOManager.getInstance()
        .removeWidget(this._textReverse);
    }
  }

  async transition(transition) {
    console.log(`Start transition : ${transition} `);
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
            this.undrawText();
            resolve();
          }, 400)
        });
      case StadiumBuilder.TRANSITIONS.CLUE_FOUND:
        return new Promise((resolve) => {
          this._addClueOnTheStadium();
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
          this._referee.domElem.attr('src', REFEREE_AFTER_IMG);
          this._referee.domElem.css('top', '480px');
          this._referee.domElem.css('width', '156px');
          this._referee.domElem.css('height', '154px');
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      default:
        console.error(`Unknown transition : ${transition} `);
    }
    return Promise.resolve();
  }
}
