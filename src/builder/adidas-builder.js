import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH } from 'tuiomanager/core/constants';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  WAREHOUSE_IMG,
  SCIENTIST_DROP_ZONE_NAME,
  SCIENTIST_IMG, AUDIO_1_IMG,
} from '../SocketIOClient/constants';
import StaticImageWidget from '../widget/images/static-image-widget';
import { DropWidget } from '../widget/decorators/drag-n-drop/drop-widget';
import Builder from './builder';

export class AdidasBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
      START: 'START',
      TALKING: 'TALKING',
      FINISHED_TALK: 'FINISHED_TALK',
    }
  }

  static get ACTIONS() {
    return {
      FINISHED: 'FINISHED',
    }
  }

  draw() {
    this._warehouse = new StaticImageWidget(1300, 250, 831, 1200, WAREHOUSE_IMG);
    this._warehouse.domElem.addClass('popup');
    this._warehouse.addTo(this.rootElement);
    const scientistRatio = 762 / 1280;
    const scientistWidth = 400;
    this._scientistImage = new ImageElementWidget(WINDOW_WIDTH, 420, scientistWidth, scientistWidth / scientistRatio, 0, 1, SCIENTIST_IMG);
    this._scientist = new DropWidget(SCIENTIST_DROP_ZONE_NAME, this._scientistImage);
    this._scientist.addTo(this.rootElement);
    this._audio = new Audio(AUDIO_1_IMG);
    this._audio.autoplay = true;
    this._audio.play();
    this.transition(AdidasBuilder.TRANSITIONS.START);
  }

  unbindEvents() {
  }

  async transition(name) {
    if (name === AdidasBuilder.TRANSITIONS.START) {
      this._scientist.domElem.addClass('smooth-translate');
      return new Promise((resolve) => {
        setTimeout(() => {
          this._scientist.moveTo(1440, 420);
          resolve();
        }, 1000);
      });
    }
    return Promise.resolve();
  }

  undraw() {
    this._scientist.domElem.remove();
  }
}
