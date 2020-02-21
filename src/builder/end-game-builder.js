import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  CLUE_BALLON_IMG,
  CLUE_SHOES_IMG,
  GAME_BACKGROUND_IMG,
  QUESTION_IMG,
  REFEREE_END_IMG,
} from '../utils/constants';
import { DragWidget } from '../widget/decorators/drag-n-drop/drag-widget';
import { DropWidget } from '../widget/decorators/drag-n-drop/drop-widget';
import StaticImageWidget from '../widget/images/static-image-widget';
import Builder from './builder';

export class EndGameBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  draw() {
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG);
    this._background.domElem.css('z-index', -50);
    this._background.addTo(this.rootElement);
    this._question = new DropWidget('ANSWER', new ImageElementWidget(850, 310, 175, 532, 0, 1, QUESTION_IMG));
    this._question.domElem.addClass('rotate');
    this._question.addTo(this.rootElement);
    this._referee = new DragWidget(new ImageElementWidget(436, 663, 291, 295, 0, 1, REFEREE_END_IMG));
    this._referee.domElem.addClass('popup');
    this.rootElement.append(this._referee.domElem);
    this._ball = new DragWidget(new ImageElementWidget(800, 87, 291, 295, 0, 1, CLUE_BALLON_IMG));
    this._ball.domElem.addClass('popup');
    this.rootElement.append(this._ball.domElem);
    this._shoes = new DragWidget(new ImageElementWidget(1168, 651, 291, 295, 0, 1, CLUE_SHOES_IMG));
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
