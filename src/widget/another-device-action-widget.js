import StaticImageWidget from './images/static-image-widget';

export class AnotherDeviceActionWidget extends StaticImageWidget {
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height, imgSrc);
    this._domElem.addClass('popup')
  }
}
