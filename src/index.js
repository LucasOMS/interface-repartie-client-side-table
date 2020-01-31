/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Lucas OMS <lucas.oms@hotmail.fr>
 * @author Olivia OSGART <olivia.osgart@gmail.com>
 */
import $ from 'jquery/dist/jquery.min'
import TUIOManager from 'tuiomanager/core/TUIOManager'
import SocketIOClient from './SocketIOClient/SocketIOClient'
import { SOCKET_ENDPOINT } from './SocketIOClient/constants';
import { GameHomeBuilder, GameHomeExternalAction } from './builder/game-home-builder';
import { HomeBuilder, HomeExternalAction } from './builder/home-builder';
import { GameBuilder, GameExternalAction } from './builder/game-builder';

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
    ghb.onAction(GameHomeExternalAction.LAUNCH_GAME, () => {
      console.log('Launch Game');
      ghb.destroy();

      const gameBuilder = new GameBuilder();
      gameBuilder.bindEvents();
      gameBuilder.draw();
      gameBuilder.onAction(GameExternalAction.EXPLORE_STADIUM, () => {
        console.log('Explore stadium');
      });
      gameBuilder.onAction(GameExternalAction.EXPLORE_LOCKER_ROOM, () => {
        console.log('Explore locker room');
      });
      gameBuilder.onAction(GameExternalAction.TALK_WITH_REFEREE, () => {
        console.log('Talk with referee');
      })
    })
  })
};

$(window)
  .ready(() => {
    buildApp()
  });
