import $ from 'jquery/dist/jquery.min';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import { LOCKER_ROOM_ID, LOCKER_ROOM_IMG } from '../SocketIOClient/constants';
import { BoundedImageWidget } from '../widget/images/bounded-image-widget';
import Builder from './builder';

export class ExplorePlaceAsTabletBuilder extends Builder {
  constructor(placeId) {
    super();
    if (placeId === LOCKER_ROOM_ID) {
      this._img = LOCKER_ROOM_IMG;
    } else {
      throw new Error(`Unknown place id : ${placeId}`);
    }
    this.rootElement = $('#app');
  }

  draw() {
    this._imgBoundedWidget = new BoundedImageWidget(0, 0, WINDOW_WIDTH * 2, WINDOW_HEIGHT * 2, this._img);
    this._imgBoundedWidget.addTo(this.rootElement)
  }

  undraw() {
    this._imgBoundedWidget.domElem.remove();
  }
}
