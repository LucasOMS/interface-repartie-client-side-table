import $ from 'jquery/dist/jquery.min';
import { WINDOW_WIDTH } from 'tuiomanager/core/constants';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  WAREHOUSE_IMG,
  SCIENTIST_DROP_ZONE_NAME,
  SCIENTIST_IMG,
  AUDIO_1,
  DIALOG_EXPERT_IMG,
  EXCLAM_IMG,
  AUDIO_2,
  AUDIO_3, DIALOG_SHOES_IMG, DIALOG_BALL_IMG,
} from '../utils/constants';
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
      START_TALK_BALL: 'START_TALK_BALL',
      START_TALK_SHOES: 'START_TALK_SHOES',
    }
  }

  draw() {
    this._warehouse = new StaticImageWidget(1380, 100, 630, 1200, WAREHOUSE_IMG);
    this._warehouse.domElem.addClass('popup');
    this._warehouse.addTo(this.rootElement);
    const scientistRatio = 762 / 1280;
    const scientistWidth = 400;
    this._scientistImage = new ImageElementWidget(WINDOW_WIDTH, 420, scientistWidth, scientistWidth / scientistRatio, 0, 1, SCIENTIST_IMG);
    this._scientistImage.shouldGoOnTop = false;
    this._scientist = new DropWidget(SCIENTIST_DROP_ZONE_NAME, this._scientistImage);
    this._scientist.addTo(this.rootElement);
    this.transition(AdidasBuilder.TRANSITIONS.START);
  }

  unbindEvents() {
  }

  async transition(name) {
    switch (name) {
      case AdidasBuilder.TRANSITIONS.START:
        this._scientist.domElem.addClass('smooth-translate');
        return new Promise((resolve) => {
          setTimeout(() => {
            this._scientist.moveTo(1250, 420);
            this._audio = new Audio(AUDIO_1);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(1200, 50, 712, 169, 0, 1, DIALOG_EXPERT_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 1000);
        });
      case AdidasBuilder.TRANSITIONS.START_TALK_BALL:
        return new Promise((resolve) => {
          setTimeout(() => {
            if (this._dialog !== undefined) {
              this._dialog.domElem.fadeOut();
            }
            this._dialog = new ImageElementWidget(1150, 10, 746, 449, 0, 1, DIALOG_BALL_IMG);
            this.rootElement.append(this._dialog.domElem);
            this._exclam.addTo(this.rootElement);
            this._audio = new Audio(AUDIO_2);
            this._audio.autoplay = true;
            this._audio.play();
            resolve();
          }, 3000)
        });
      case AdidasBuilder.TRANSITIONS.START_TALK_SHOES:
        return new Promise((resolve) => {
          setTimeout(() => {
            if (this._dialog !== undefined) {
              this._dialog.domElem.fadeOut();
            }
            this._dialog = new ImageElementWidget(1200, 50, 782, 175, 0, 1, DIALOG_SHOES_IMG);
            this.rootElement.append(this._dialog.domElem);
            this._exclam = new StaticImageWidget(1360, 200, 70, 285, EXCLAM_IMG);
            this._exclam.domElem.addClass('popup');
            this._exclam.addTo(this.rootElement);
            this._audio = new Audio(AUDIO_3);
            this._audio.autoplay = true;
            this._audio.play();
            resolve();
          }, 3000)
        });
      default:
        console.error(`Unknown transition : ${name} `);
    }
    return Promise.resolve();
  }

  undraw() {
    this._scientist.domElem.remove();
    this._exclam.domElem.remove();
    this._warehouse.domElem.remove();
    this._scientistImage.domElem.remove();
    this._dialog.domElem.remove();
  }
}
