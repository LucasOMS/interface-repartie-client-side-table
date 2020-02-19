import $ from 'jquery/dist/jquery.min'
import {
  DEVICE_CONNECTED,
  DEVICE_DISCONNECTED,
  PLAY_IMAGE_SRC_PATH,
  SERVER_REST_ROOT_PATH,
  TABLE_IMAGE_SRC_PATH,
  TABLET_IMAGE_SRC_PATH,
  VR_IMAGE_SRC_PATH,
} from '../utils/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import ImageClicWidget from '../widget/images/image-clic-widget';
import StaticImageWidget from '../widget/images/static-image-widget';
import Builder from './builder';

export class HomeBuilder extends Builder {
  constructor() {
    super();
    this.drawOnce = false;
    this._vrConnected = false;
    this._tabletConnected = false;
    this._tableImage = null;
    this._tabletImage = null;
    this._vrImage = null;
    this.rootElement = $('#app');
  }

  bindEvents() {
    $.get(`${SERVER_REST_ROOT_PATH}/devices`, (data) => {
      this._vrConnected = data.vr;
      this._tabletConnected = data.tablet;
    });

    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, (data) => {
        switch (data.device_type) {
          case 'VR':
            this._vrConnected = true;
            break;
          case 'TABLET':
            this._tabletConnected = true;
            break;
          default:
        }
        this.draw();
      });

    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, (data) => {
        switch (data.device_type) {
          case 'VR':
            this._vrConnected = false;
            break;
          case 'TABLET':
            this._tabletConnected = false;
            break;
          default:
        }
        this.draw();
      });
  }

  draw() {
    if (this.drawOnce) {
      this.undraw();
    }
    this.drawOnce = true;
    this._drawDevicesImages();
    // Construct buttons only once
    const playWidth = 191;
    const playHeight = 156;
    this._buttonPlay = new ImageClicWidget(960 - (playWidth / 2), 640 - (playHeight / 2), playWidth, playHeight, PLAY_IMAGE_SRC_PATH);
    this._buttonPlay.onClick = () => {
      this.emitAction('START_PLAY');
    };
    this.rootElement.append(this._buttonPlay.domElem);
  }

  _drawDevicesImages() {
    let deviceCount = 1;
    if (this._tabletConnected) {
      deviceCount += 1;
    }
    if (this._vrConnected) {
      deviceCount += 1;
    }

    const centerX = 960;
    const gap = 80;
    const centerY = 340;

    // Define const to compute total width and height
    const tableImageWidth = 209;
    const tableImageHeight = 121;
    const tabletImageWidth = 203;
    const tabletImageHeight = 173;
    const vrImageWidth = 203;
    const vrImageHeight = 72;

    const realWidth = gap * (deviceCount - 1)
      + tableImageWidth
      + (this._tabletConnected ? tabletImageWidth : 0)
      + (this._vrConnected ? vrImageWidth : 0);
    let widthUsed = 0;

    // OriginX are equals to real center X - (realWidth / 2) + total width already in use
    // OriginY are equals to real center Y - (imageHeight / 2)

    // Construct Tablet
    if (this._tabletConnected) {
      const tabletOriginX = centerX - (realWidth / 2) + widthUsed;
      widthUsed += tabletImageWidth + gap;
      this._tabletImage = new StaticImageWidget(tabletOriginX, centerY - (tabletImageHeight / 2), tabletImageWidth, tabletImageHeight, TABLET_IMAGE_SRC_PATH);
      this.rootElement.append(this._tabletImage.domElem);
    }

    // Construct Table
    const tableOriginX = centerX - (realWidth / 2) + widthUsed;
    widthUsed += tableImageWidth + (this._vrConnected ? gap : 0);
    this._tableImage = new StaticImageWidget(tableOriginX, centerY - (tableImageHeight / 2), tableImageWidth, tableImageHeight, TABLE_IMAGE_SRC_PATH);
    this.rootElement.append(this._tableImage.domElem);

    // Construct VR
    if (this._vrConnected) {
      const vrOriginX = centerX - (realWidth / 2) + widthUsed;
      this._vrImage = new StaticImageWidget(vrOriginX, centerY - (vrImageHeight / 2), vrImageWidth, vrImageHeight, VR_IMAGE_SRC_PATH);
      this.rootElement.append(this._vrImage.domElem);
    }
  }

  undraw() {
    if (this._tableImage) {
      this._tableImage.domElem.remove();
    }
    if (this._tabletImage) {
      this._tabletImage.domElem.remove();
    }
    if (this._vrImage) {
      this._vrImage.domElem.remove();
    }
    this._buttonPlay.domElem.remove();
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, () => {
      });
  }
}

export const HomeExternalAction = {
  START_PLAY: 'START_PLAY',
};
