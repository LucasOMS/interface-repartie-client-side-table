/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Lucas OMS <lucas.oms@hotmail.fr>
 */
import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
import SocketIOClient from './SocketIOClient/SocketIOClient'
import { SOCKET_ENDPOINT } from './SocketIOClient/constants';
import { GameHomeBuilder } from './builder/game-home-builder';
import { HomeBuilder, HomeExternalAction } from './builder/home-builder';

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();

/* Start SocketIO Client */
const socketIOClient = new SocketIOClient();
socketIOClient.start(SOCKET_ENDPOINT);

/* App Code */
const buildApp = () => {
  const homeBuilder = new HomeBuilder();
  homeBuilder.bindEvents();
  homeBuilder.draw();
  homeBuilder.onAction(HomeExternalAction.START_PLAY, () => {
    console.log('Start play');
    homeBuilder.destroy();

    const ghb = new GameHomeBuilder();
    ghb.bindEvents();
    ghb.draw();
  })
};

$(window)
  .ready(() => {
    buildApp()
  });
