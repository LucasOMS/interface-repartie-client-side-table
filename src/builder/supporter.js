import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import Builder from './builder';
import StaticImageWidget from '../widget/images/static-image-widget';
import {
  SUPPORTER_IMG,
  DIALOG_SUPPORTER_1_IMG,
  DIALOG_SUPPORTER_2_IMG,
  DIALOG_SUPPORTER_3_IMG,
  DIALOG_SUPPORTER_4_IMG,
  DIALOG_SUPPORTER_5_IMG, SUPPORTER_AUDIO_1, SUPPORTER_AUDIO_2, SUPPORTER_AUDIO_3, SUPPORTER_AUDIO_4, SUPPORTER_AUDIO_5,
} from '../utils/constants';

export class SupporterBuilder extends Builder {
  constructor() {
    super();
    this.state = 'START';
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
      START_TALK1: 'START_TALK1',
      FINISH_TALK1: 'FINISH_TALK1',
      START_TALK2: 'START_TALK2',
      FINISH_TALK2: 'FINISH_TALK2',
      START_TALK3: 'START_TALK3',
      START_TALK4: 'START_TALK4',
      FINISH_TALK4: 'FINISH_TALK4',
      START_TALK5: 'START_TALK5',
    }
  }

  draw() {
    this._supporter = new StaticImageWidget(735, 600, 512, 580, SUPPORTER_IMG);
    this.rootElement.append(this._supporter.domElem);
    this.transition(SupporterBuilder.TRANSITIONS.START_TALK1);
  }

  async transition(transition) {
    console.log(`Start transition : ${transition} `);
    switch (transition) {
      case SupporterBuilder.TRANSITIONS.START_TALK1:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._audio = new Audio(SUPPORTER_AUDIO_1);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(1130, 650, 779, 196, 0, 1, DIALOG_SUPPORTER_1_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 1000)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK2:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            this._audio = new Audio(SUPPORTER_AUDIO_2);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(1130, 650, 779, 123, 0, 1, DIALOG_SUPPORTER_2_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 1000)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK3:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            this._audio = new Audio(SUPPORTER_AUDIO_3);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(1130, 650, 779, 166, 0, 1, DIALOG_SUPPORTER_3_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 1000)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK4:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            this._audio = new Audio(SUPPORTER_AUDIO_4);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(50, 800, 774, 188, 0, 1, DIALOG_SUPPORTER_4_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 3000)
        });
      case SupporterBuilder.TRANSITIONS.FINISH_TALK4:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            resolve();
          }, 200)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK5:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._audio = new Audio(SUPPORTER_AUDIO_5);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(50, 800, 774, 188, 0, 1, DIALOG_SUPPORTER_5_IMG);
            this.rootElement.append(this._dialog.domElem);
            resolve();
          }, 3000)
        });
      default:
        console.error(`Unknown transition : ${transition} `);
    }
    return Promise.resolve();
  }
}
