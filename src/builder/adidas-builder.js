import $ from 'jquery/dist/jquery.min';
import ImageClicWidget from '../widget/images/image-clic-widget';
import {
  CLUE_FOUND,
  EXPERT_IMG,
  WAREHOUSE_IMG,
} from '../SocketIOClient/constants';
import Builder from './builder';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import StaticImageWidget from '../widget/images/static-image-widget';

export class AdidasBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
  }

  static get TRANSITIONS() {
    return {
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
    this.state = 'START';
    this._warehouse = new StaticImageWidget(1300, 250, 831, 1200, WAREHOUSE_IMG);
    this._warehouse.domElem.addClass('popup');
    this._warehouse.addTo(this.rootElement);
    this._expert = new ImageClicWidget(900, 300, 944, 819, EXPERT_IMG);
    this._expert.domElem.addClass('popup');
    this._expert.addTo(this.rootElement);
    this._expert.onClick = () => {
      // region Start explore stadium on tablet
      if (this.state === 'START') {
        this.state = 'TALKING';
      }
    }
  }

  undraw() {
    this._warehouse.domElem.remove();
    this._expert.domElem.remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, () => {
      });
  }
}
