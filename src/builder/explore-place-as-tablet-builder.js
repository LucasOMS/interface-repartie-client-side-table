import $ from 'jquery/dist/jquery.min';
import {
  CLUE_BALL_ID, CLUE_SHOES_ID,
  LOCKER_ROOM_ID,
  LOCKER_ROOM_IMG,
  LOCKER_ROOM_LOCKERS_ID,
  LOCKER_ROOM_LOCKERS_IMG,
} from '../SocketIOClient/constants';
import { BoundedImageWidget } from '../widget/images/bounded-image-widget';
import Builder from './builder';

export class ExplorePlaceAsTabletBuilder extends Builder {
  constructor(placeId) {
    super();
    this._placeId = parseInt(placeId, 0);
    if (placeId === LOCKER_ROOM_ID) {
      this._img = LOCKER_ROOM_IMG;
    } else if (placeId === LOCKER_ROOM_LOCKERS_ID) {
      this._img = LOCKER_ROOM_LOCKERS_IMG;
    } else {
      throw new Error(`Unknown place id : ${placeId}`);
    }
    this.rootElement = $('#app');
    this._createClueHitbox();
  }

  static get EXTERNAL_ACTION() {
    return {
      CLUE_FOUND: 'CLUE_FOUND',
    }
  }

  draw() {
    const width = this._placeId === LOCKER_ROOM_ID ? 3840 : 4810;
    const height = this._placeId === LOCKER_ROOM_ID ? 4810 : 3840;
    this._imgBoundedWidget = new BoundedImageWidget(0, 0, width, height, this._img);
    this._imgBoundedWidget.addTo(this.rootElement);
    this._bindClicOnClue();
  }

  undraw() {
    this._imgBoundedWidget.domElem.remove();
  }

  _bindClicOnClue() {
    this._imgBoundedWidget.onClic = (touch) => {
      const cursorPositionOnImage = {
        x: touch.x - this._imgBoundedWidget.x,
        y: touch.y - this._imgBoundedWidget.y,
      };
      if (this._clue.x1 < cursorPositionOnImage.x && this._clue.x2 > cursorPositionOnImage.x
        && this._clue.y1 < cursorPositionOnImage.y && this._clue.y2 > cursorPositionOnImage.y) {
        this.emitAction('CLUE_FOUND', { clue_id: this._placeId === LOCKER_ROOM_ID ? CLUE_BALL_ID : CLUE_SHOES_ID });
      }
    };
  }

  _createClueHitbox() {
    this._clue = {};
    switch (this._placeId) {
      case LOCKER_ROOM_ID:
        this._clue.x1 = 638;
        this._clue.y1 = 3383;
        this._clue.x2 = 638 + 504;
        this._clue.y2 = 3383 + 504;
        break;
      case LOCKER_ROOM_LOCKERS_ID:
        this._clue.x1 = 2840;
        this._clue.y1 = 1150;
        this._clue.x2 = 2840 + 707;
        this._clue.y2 = 1150 + 299;
        break;
      default:
    }
  }
}
