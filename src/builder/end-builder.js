import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import { GAME_BACKGROUND_IMG_NO_TRANSPARENT, JOURNAL_END_IMG, JOURNAL_END_REVERSE_IMG } from '../utils/constants';
import StaticImageWidget from '../widget/images/static-image-widget';
import Builder from './builder';

export class EndBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  draw() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG_NO_TRANSPARENT);
    this._background.domElem.css('z-index', 905);
    this._background.addTo(this.rootElement);
    this._newspaper = new ImageElementWidget(950, 60, 940, 880, 0, 1, JOURNAL_END_IMG);
    this._newspaper.domElem.css('z-index', 906);
    this._newspaper.domElem.addClass('popup');
    this._newspaper.shouldGoOnTop = false;
    this._newspaper.addTo(this.rootElement);
    this._newspaperReverse = new ImageElementWidget(50, 60, 940, 880, 0, 1, JOURNAL_END_REVERSE_IMG);
    this._newspaperReverse.domElem.css('transform', 'rotate(180deg)');
    this._newspaperReverse.domElem.css('z-index', 906);
    this._newspaperReverse.domElem.addClass('popup');
    this._newspaperReverse.shouldGoOnTop = false;
    this._newspaperReverse.addTo(this.rootElement);
  }

  undraw() {
    this._background.domElem.remove();
    this._question.domElem.remove();
    this._referee.domElem.remove();
    this._ball.domElem.remove();
    this._shoes.domElem.remove();
    if (this._video) {
      this._video.domElem.remove();
    }
    // ElementWidget.zIndexGlobal = this.initialzIndex;
  }

  async transition(name) {
    if (name === 'END') {
      if (!this.videoFinished) return Promise.resolve();
      console.log('END');
    }
    return Promise.resolve();
  }
}
