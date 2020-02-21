import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  CLUE_BALLON_IMG,
  CLUE_SHOES_IMG,
  GAME_BACKGROUND_IMG,
  QUESTION_IMG,
  REFEREE_END_IMG,
} from '../utils/constants';
import StaticImageWidget from '../widget/images/static-image-widget';
import Builder from './builder';
import ImageClicWidget from '../widget/images/image-clic-widget';

export class EndGameBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  draw() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG);
    this._background.domElem.css('z-index', -50);
    this.rootElement.append(this._background.domElem);
    this._question = new ImageElementWidget(850, -50, 175, 532, 0, 1, QUESTION_IMG);
    this._question.addTo(this.rootElement);
    this._referee = new ImageClicWidget(300, 550, 291, 295, REFEREE_END_IMG);
    this._referee.domElem.addClass('popup');
    this.rootElement.append(this._referee.domElem);
    this._ball = new ImageClicWidget(800, 550, 291, 295, CLUE_BALLON_IMG);
    this._ball.domElem.addClass('popup');
    this.rootElement.append(this._ball.domElem);
    this._shoes = new ImageClicWidget(1300, 550, 291, 295, CLUE_SHOES_IMG);
    this._shoes.domElem.addClass('popup');
    this.rootElement.append(this._shoes.domElem);
  }

  undraw() {
    this._background.domElem.remove();
    this._question.domElem.remove();
    this._referee.domElem.remove();
    this._ball.domElem.remove();
    this._shoes.domElem.remove();
  }

  bindEvents() {

  }

  unbindEvents() {

  }
}
