/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget'
import ImageWidget from './ImageWidget/ImageWidget'

import SocketIOClient from './SocketIOClient/SocketIOClient'
import { EXPLORE_PLACE, PLAY_IMAGE_SRC_PATH, REFRESH_IMAGE_SRC_PATH, SERVER_REST_ROOT_PATH, TABLE_IMAGE_SRC_PATH, TABLET_IMAGE_SRC_PATH, VR_IMAGE_SRC_PATH, } from './SocketIOClient/constants';

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();

/* Start SocketIO Client */
const socketIOClient = new SocketIOClient();
socketIOClient.start();

/* App Code */
const buildApp = () => {
  buildPlayButton();
};

function constructGameHome() {
  clearContent();
}

let deviceConnectedQuery;

let buttonRefreshDevice;
let buttonPlayWithDevices;

function displayConnectedDevices() {
  const rootElement = $('#app');
  if (deviceConnectedQuery) {
    deviceConnectedQuery.abort();
  }

  deviceConnectedQuery = $.get(`${SERVER_REST_ROOT_PATH}/devices`, (res) => {
    destroyWidget();
    clearContent();
    console.log('Retrieving connected devices', res);
    createDevicesPictures(res.table, res.tablet, res.vr);
    constructPlayAndRefreshButton();
  });

  function createDevicesPictures(table, tablet, vr) {
    let deviceCount = 0;
    if (table) {
      deviceCount += 1;
    }
    if (tablet) {
      deviceCount += 1;
    }
    if (vr) {
      deviceCount += 1;
    }

    const centerX = 960;
    const gap = 40;
    const centerY = 340;

    // Define const to compute total width and height
    const tableImageWidth = 209;
    const tableImageHeight = 121;
    const tabletImageWidth = 203;
    const tabletImageHeight = 173;
    const vrImageWidth = 203;
    const vrImageHeight = 72;

    const realWidth = gap * (deviceCount - 1)
      + (table ? tableImageWidth : 0)
      + (tablet ? tabletImageWidth : 0)
      + (vr ? vrImageWidth : 0);
    let widthUsed = 0;

    // OriginX are equals to real center X - (realWidth / 2) + total width already in use
    // OriginY are equals to real center Y - (imageHeight / 2)

    // Construct Tablet
    if (tablet) {
      const tabletOriginX = centerX - (realWidth / 2) + widthUsed;
      widthUsed += tabletImageWidth + (deviceCount > 1 ? gap : 0);
      const tabletImage = new ImageWidget(tabletOriginX, centerY - (tabletImageHeight / 2), tabletImageWidth, tabletImageHeight, TABLET_IMAGE_SRC_PATH);
      rootElement.append(tabletImage.domElem);
    }

    // Construct Table
    if (table) {
      const tableOriginX = centerX - (realWidth / 2) + widthUsed;
      widthUsed += tableImageWidth + (deviceCount > 2 ? gap : 0);
      const tableImage = new ImageWidget(tableOriginX, centerY - (tableImageHeight / 2), tableImageWidth, tableImageHeight, TABLE_IMAGE_SRC_PATH);
      rootElement.append(tableImage.domElem);
    }

    // Construct VR
    if (vr) {
      const vrOriginX = centerX - (realWidth / 2) + widthUsed;
      const vrImage = new ImageWidget(vrOriginX, centerY - (vrImageHeight / 2), vrImageWidth, vrImageHeight, VR_IMAGE_SRC_PATH);
      rootElement.append(vrImage.domElem);
    }
  }

  function constructPlayAndRefreshButton() {
    const playWidth = 191;
    const playHeight = 156;
    const refreshWidth = 250;
    const refreshHeight = 250;
    buttonRefreshDevice = new ImageWidget(1060 - (refreshWidth / 2), 640 - (refreshHeight / 2), refreshWidth, refreshHeight, REFRESH_IMAGE_SRC_PATH);
    buttonRefreshDevice.onTouchCreation = (touch) => {
      if (buttonRefreshDevice.isTouched(touch.x, touch.y)) {
        console.log('Retrieve connected devices again');
        clearContent();
        displayConnectedDevices();
      }
    };
    buttonPlayWithDevices = new ImageWidget(860 - (playWidth / 2), 640 - (playHeight / 2), playWidth, playHeight, PLAY_IMAGE_SRC_PATH);
    buttonPlayWithDevices.onTouchCreation = (touch) => {
      if (buttonPlayWithDevices.isTouched(touch.x, touch.y)) {
        socketIOClient.sendEvent(EXPLORE_PLACE);
        console.log('Start playing');
        constructGameHome();
      }
    };
    rootElement.append(buttonRefreshDevice.domElem);
    rootElement.append(buttonPlayWithDevices.domElem);
  }

  function destroyWidget() {
    if (buttonRefreshDevice) {
      console.log(buttonRefreshDevice);
      TUIOManager.getInstance()
        .removeWidget(buttonRefreshDevice);
    }
    if (buttonPlayWithDevices) {
      TUIOManager.getInstance()
        .removeWidget(buttonPlayWithDevices);
    }
  }
}

function buildPlayButton() {
  const rootElement = $('#app');
  const playWidth = 191;
  const playHeight = 156;
  const buttonPlay = new ImageWidget(960 - (playWidth / 2), 540 - (playHeight / 2), playWidth, playHeight, PLAY_IMAGE_SRC_PATH);
  buttonPlay.onTouchCreation = (touch) => {
    if (buttonPlay.isTouched(touch.x, touch.y)) {
      displayConnectedDevices();
      buttonPlay.deleteWidget();
    }
  };
  rootElement.append(buttonPlay.domElem);
}

function clearContent() {
  $('#app')
    .empty();
}

// TODO
// function startGame() {
//
// }

$(window)
  .ready(() => {
    buildApp()
  });
