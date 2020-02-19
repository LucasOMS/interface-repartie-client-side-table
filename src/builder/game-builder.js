import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import {
  CLUE_BALL_ID,
  CLUE_BALLON_IMG,
  CLUE_FOUND, CLUE_NOTE_ID,
  CLUE_SHOES_ID, CLUE_SHOES_IMG,
  DEVICE_DISCONNECTED, END_TALK, EXCLAM_IMG, EXPLORE_PLACE, LOCKER_ROOM_ID, SCIENTIST_DROP_ZONE_NAME, AUDIO_3,
  STADIUM_ID, AUDIO_2,
} from '../utils/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { DragWidget } from '../widget/decorators/drag-n-drop/drag-widget';
import Builder from './builder';
import { DisconnectedDeviceBuilder } from './disconnected-device-builder';
import { ExplorePlaceAsTabletBuilder } from './explore-place-as-tablet-builder';
import { LockerRoomBuilder } from './locker-room-builder';
import { StadiumBuilder } from './stadium-builder';
import { AdidasBuilder } from './adidas-builder';
import StaticImageWidget from '../widget/images/static-image-widget';

export class GameBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
    this._stadium = new StadiumBuilder();
  }

  bindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, (data) => {
        this.unbindEvents();
        const builder = new DisconnectedDeviceBuilder(data.device_type);
        builder.bindEvents();
        builder.draw();
        builder.onAction(DisconnectedDeviceBuilder.EXTERNAL_ACTION.DISCONNECTED_DEVICE_REACT, () => {
          builder.destroy();
          this.bindEvents();
        });
      });

    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, async (data) => {
        const clueId = parseInt(data.clue_id, 0);
        if (clueId === CLUE_NOTE_ID && !this._noteFound) {
          this._noteFound = true;
          await this._stadium.transition(StadiumBuilder.TRANSITIONS.FINISH_VR);
          await this._stadium.transition(StadiumBuilder.TRANSITIONS.CLUE_FOUND);
        } else {
          this._addClue(clueId);
          if (clueId === CLUE_SHOES_ID) {
            this._adidas = new AdidasBuilder();
            this._adidas.bindEvents();
            this._adidas.draw();
          }
        }
      });
    SocketIOClient.getInstance()
      .onEvent(END_TALK, async () => {
        await this._stadium.transition(StadiumBuilder.TRANSITIONS.SWIPE_LEFT)
          .then(() => {
            this._lockerRoom = new LockerRoomBuilder();
            this._lockerRoom.draw();
            this._lockerRoom.onAction(EXPLORE_PLACE, () => {
              SocketIOClient.getInstance()
                .sendEvent(EXPLORE_PLACE, { id: LOCKER_ROOM_ID })
            })
          });
      });

    SocketIOClient.getInstance()
      .onEvent(EXPLORE_PLACE, (data) => {
        if (data.id === STADIUM_ID) {
          return;
        }
        const replaceTabletBuilder = new ExplorePlaceAsTabletBuilder(parseInt(data.id, 0));
        replaceTabletBuilder.draw();
        replaceTabletBuilder.onAction(ExplorePlaceAsTabletBuilder.EXTERNAL_ACTION.CLUE_FOUND, (clue) => {
          SocketIOClient.getInstance()
            .sendEvent(CLUE_FOUND, { clue_id: clue.clue_id });
          replaceTabletBuilder.destroy();
        });
      });
    this._stadium.bindEvents();
  }

  _addClue(clueId) {
    switch (clueId) {
      case CLUE_BALL_ID:
        if (this.foundBall) {
          return;
        }
        this.foundBall = true;
        this._clueBallWidget = new DragWidget(
          new ImageElementWidget(1000, 80, 150, 150, 0, 1, CLUE_BALLON_IMG),
        );
        this._clueBallWidget.domElem.addClass('popup');
        this._clueBallWidget.addTo(this.rootElement);
        this._clueBallWidget.onDrop = (zone) => {
          if (zone === SCIENTIST_DROP_ZONE_NAME) {
            this._exclam = new StaticImageWidget(1360, 200, 70, 285, EXCLAM_IMG);
            this._exclam.domElem.addClass('popup');
            this._exclam.addTo(this.rootElement);
            this._audio = new Audio(AUDIO_2);
            this._audio.autoplay = true;
            this._audio.play();
            console.log('Show ball to scientist');
          }
        };
        break;
      case CLUE_SHOES_ID:
        if (this.foundShoe) {
          return;
        }
        this._lockerRoom.removeWaiting();
        this.foundShoe = true;
        this._shoeBallWidget = new DragWidget(
          new ImageElementWidget(1000, 220, 150, 150, 0, 1, CLUE_SHOES_IMG),
        );
        this._shoeBallWidget.domElem.addClass('popup');
        this._shoeBallWidget.addTo(this.rootElement);
        this._shoeBallWidget.onDrop = (zone) => {
          if (zone === SCIENTIST_DROP_ZONE_NAME) {
            this._exclam = new StaticImageWidget(1360, 200, 70, 285, EXCLAM_IMG);
            this._exclam.domElem.addClass('popup');
            this._exclam.addTo(this.rootElement);
            this._audio = new Audio(AUDIO_3);
            this._audio.autoplay = true;
            this._audio.play();
            console.log('Show shoes to scientist');
          }
        };
        break;
      default:
        console.log(`Unknown clue id : ${clueId}`);
    }
  }

  draw() {
    this._stadium.draw();
  }

  undraw() {
    this._stadium.undraw();
    if (this._clueBallWidget) {
      this._clueBallWidget.domElem.remove();
    }
    if (this._shoeBallWidget) {
      this._shoeBallWidget.domElem.remove();
    }
  }

  unbindEvents() {
    this._stadium.unbindEvents();
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(END_TALK, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(CLUE_FOUND, () => {
      });
  }
}
