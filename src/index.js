/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Lucas OMS <lucas.oms@hotmail.fr>
 * @author Olivia OSGART <olivia.osgart@gmail.com>
 */
import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
import { GameBuilder } from './builder/game-builder';
import { GameHomeBuilder, GameHomeExternalAction } from './builder/game-home-builder';
import { HomeBuilder, HomeExternalAction } from './builder/home-builder';
import SocketIOClient from './SocketIOClient/SocketIOClient'
import { PROFILES, SOCKET_ENDPOINT } from './utils/constants';

/* TUIOManager start */
const tuioManager = new TUIOManager();
tuioManager.start();

/* Start SocketIO Client */
const socketIOClient = new SocketIOClient();
socketIOClient.start(SOCKET_ENDPOINT);

/* App Code */
const buildApp = (profile) => {
  TUIOManager.getInstance().showInteractions = profile === PROFILES.LOCAL;
  const homeBuilder = new HomeBuilder();
  homeBuilder.bindEvents();
  homeBuilder.draw();
  homeBuilder.onAction(HomeExternalAction.START_PLAY, () => {
    homeBuilder.destroy();

    const ghb = new GameHomeBuilder();
    ghb.bindEvents();
    ghb.draw();
    ghb.onAction(GameHomeExternalAction.LAUNCH_GAME, () => {
      ghb.destroy();

      const gameBuilder = new GameBuilder();
      gameBuilder.bindEvents();
      gameBuilder.draw();
    })
  });
};

$(window)
  .ready(() => {
    buildApp(PROFILES.LOCAL)
  });
