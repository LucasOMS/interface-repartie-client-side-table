/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
// import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget'
import ImageWidget from './ImageWidget/ImageWidget'

import SocketIOClient from './SocketIOClient/SocketIOClient'
import { EXPLORE_PLACE } from './SocketIOClient/constants';

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();

/* Start SocketIO Client */
const socketIOClient = new SocketIOClient();
socketIOClient.start();

/* App Code */
const buildApp = () => {
  /*
    const imageWidget = new ImageElementWidget(0, 0, 365, 289, 0, 1, 'assets/UCAlogoQhaut.png')
    imageWidget.addTo('#app')
    */
  const imageWidget = new ImageWidget(0, 0, 365, 289, 'assets/UCAlogoQhaut.png');
  imageWidget.onTouchCreation = () => {
    socketIOClient.sendEvent(EXPLORE_PLACE);
    console.log('Ask for exploring place')
  };
  $('#app')
    .append(imageWidget.domElem);
};

$(window)
  .ready(() => {
    buildApp()
  });
