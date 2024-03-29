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
  DIALOG_SUPPORTER_5_IMG,
  SUPPORTER_AUDIO_1,
  SUPPORTER_AUDIO_2,
  SUPPORTER_AUDIO_3,
  SUPPORTER_AUDIO_4,
  SUPPORTER_AUDIO_5,
  GAME_BACKGROUND_IMG, SUPPORTER_AUDIO_6,
} from '../utils/constants';

export class SupporterBuilder extends Builder {
  constructor() {
    super();
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
      FINISH_TALK5: 'FINISH_TALK5',
      START_TALK6: 'START_TALK6',
    }
  }

  draw() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG);
    this._background.domElem.css('z-index', -50);
    this.rootElement.append(this._background.domElem);
    this._supporter = new StaticImageWidget(735, 600, 512, 580, SUPPORTER_IMG);
    this._supporter.addTo('#app');
  }

  undraw() {
    if (this._supporter) this._supporter.domElem.remove();
    if (this._dialog) this._dialog.domElem.remove();
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
            this._dialog.addTo(this.rootElement);
            resolve();
          }, 1000)
        });
      case SupporterBuilder.TRANSITIONS.FINISH_TALK1:
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 11000)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK2:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            this._audio = new Audio(SUPPORTER_AUDIO_2);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(1130, 650, 779, 123, 0, 1, DIALOG_SUPPORTER_2_IMG);
            this._dialog.addTo(this.rootElement);
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
            this._dialog.addTo(this.rootElement);
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
            this._dialog.addTo(this.rootElement);
            resolve();
          }, 1000)
        });
      case SupporterBuilder.TRANSITIONS.FINISH_TALK4:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._dialog.domElem.fadeOut();
            resolve();
          }, 10000)
        });
      case SupporterBuilder.TRANSITIONS.START_TALK5:
        return new Promise((resolve) => {
          setTimeout(() => {
            this._audio = new Audio(SUPPORTER_AUDIO_5);
            this._audio.autoplay = true;
            this._audio.play();
            this._dialog = new ImageElementWidget(50, 800, 774, 188, 0, 1, DIALOG_SUPPORTER_5_IMG);
            this._dialog.addTo(this.rootElement);
            resolve();
          }, 3000)
        });
      case SupporterBuilder.TRANSITIONS.FINISH_TALK5:
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 7000);
        });
      case SupporterBuilder.TRANSITIONS.START_TALK6:
        this._audio = new Audio(SUPPORTER_AUDIO_6);
        this._audio.autoplay = true;
        this._audio.play();
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 7000);
        });
      default:
        console.error(`Unknown transition : ${transition} `);
    }
    return Promise.resolve();
  }
}
