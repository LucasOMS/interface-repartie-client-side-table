import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  CLUE_BALLON_IMG,
  CLUE_SHOES_IMG,
  GAME_BACKGROUND_IMG_NO_TRANSPARENT,
  MATCH_VIDEO_PREVIEW_PATH,
  QUESTION_IMG,
  REFEREE_END_IMG,
} from '../utils/constants';
import { DragWidget } from '../widget/decorators/drag-n-drop/drag-widget';
import { DropWidget } from '../widget/decorators/drag-n-drop/drop-widget';
import StaticImageWidget from '../widget/images/static-image-widget';
import Builder from './builder';
import { EndBuilder } from './end-builder';

export class EndGameBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
    // this.initialzIndex = ElementWidget.zIndexGlobal;
  }

  draw() {
    this._dropzoneName = 'ANSWER';
    // ElementWidget.zIndexGlobal = 901;
    this._background = new StaticImageWidget(0, 0, 1920, 1080, GAME_BACKGROUND_IMG_NO_TRANSPARENT);
    this._background.domElem.css('z-index', 901);
    this._background.addTo(this.rootElement);
    this._question = new DropWidget(this._dropzoneName, new ImageElementWidget(850, 310, 175, 532, 0, 1, QUESTION_IMG));
    this._question.domElem.css('z-index', 902);
    this._question.domElem.addClass('rotate');
    this._question.shouldGoOnTop = false;
    this._question.addTo(this.rootElement);
    this._referee = new DragWidget(new ImageElementWidget(436, 663, 291, 295, 0, 1, REFEREE_END_IMG));
    this._referee.domElem.css('z-index', 902);
    this._referee.domElem.addClass('popup');
    this._referee.shouldGoOnTop = false;
    this._referee.onDrop = (dropName) => {
      if (dropName === this._dropzoneName) {
        this.transition('END');
      }
    };
    this._referee.addTo(this.rootElement);
    this._ball = new DragWidget(new ImageElementWidget(420, 87, 291, 295, 0, 1, CLUE_BALLON_IMG));
    this._ball.domElem.css('z-index', 902);
    this._ball.domElem.addClass('popup');
    this._ball.shouldGoOnTop = false;
    this._ball.onDrop = (dropName) => {
      if (dropName === this._dropzoneName) {
        this.transition('END');
      }
    };
    this._ball.addTo(this.rootElement);
    this._shoes = new DragWidget(new ImageElementWidget(1168, 651, 291, 295, 0, 1, CLUE_SHOES_IMG));
    this._shoes.domElem.css('z-index', 902);
    this._shoes.domElem.addClass('popup');
    this._shoes.shouldGoOnTop = false;
    this._shoes.onDrop = (dropName) => {
      if (dropName === this._dropzoneName) {
        this.transition('END');
      }
    };
    this._shoes.addTo(this.rootElement);
    this._match = new DragWidget(new ImageElementWidget(1060, 120, 480, 270, 0, 1, MATCH_VIDEO_PREVIEW_PATH));
    this._match.domElem.css('z-index', 902);
    this._match.domElem.addClass('popup');
    this._match.shouldGoOnTop = false;
    this._match.addTo(this.rootElement);
    this._match.onDrop = (dropName) => {
      if (dropName === this._dropzoneName) {
        this.transition('END');
      }
    };
  }

  undraw() {
    this._background.domElem.remove();
    this._question.domElem.remove();
    this._referee.domElem.remove();
    this._ball.domElem.remove();
    this._shoes.domElem.remove();
    this._match.domElem.remove();
  }

  async transition(name) {
    if (name === 'END') {
      this._end = new EndBuilder();
      this._end.bindEvents();
      this._end.draw();
    }
    return Promise.resolve();
  }
}
