import $ from 'jquery/dist/jquery.min';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import VideoElementWidget from 'tuiomanager/widgets/ElementWidget/VideoElementWidget/VideoElementWidget';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import {
  CLUE_BALL_ID,
  CLUE_BALLON_IMG,
  CLUE_FOUND,
  CLUE_NOTE_ID,
  CLUE_SHOES_ID,
  CLUE_SHOES_IMG,
  DEVICE_DISCONNECTED,
  END_TALK,
  EXPLORE_PLACE,
  LOCKER_ROOM_ID,
  MATCH_VIDEO_PATH,
  SCIENTIST_DROP_ZONE_NAME,
  STADIUM_ID,
} from '../utils/constants';
import { DragWidget } from '../widget/decorators/drag-n-drop/drag-widget';
import { AdidasBuilder } from './adidas-builder';
import Builder from './builder';
import { DisconnectedDeviceBuilder } from './disconnected-device-builder';
import { EndGameBuilder } from './end-game-builder';
import { ExplorePlaceAsTabletBuilder } from './explore-place-as-tablet-builder';
import { LockerRoomBuilder } from './locker-room-builder';
import { StadiumBuilder } from './stadium-builder';
import { SupporterBuilder } from './supporter';

export class GameBuilder extends Builder {
  constructor() {
    super();
    this.rootElement = $('#app');
    this._stadium = new StadiumBuilder();
    this._supporter = new SupporterBuilder();
    this._showedShoes = false;
    this._showedBall = false;
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
          await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK2);
          await this._stadium.transition(StadiumBuilder.TRANSITIONS.FINISH_VR);
          await this._stadium.transition(StadiumBuilder.TRANSITIONS.CLUE_FOUND);
        } else {
          this._addClue(clueId);
          if (clueId === CLUE_SHOES_ID) {
            await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK4);
            await this._supporter.transition(SupporterBuilder.TRANSITIONS.FINISH_TALK4);
            this._adidas = new AdidasBuilder();
            this._adidas.bindEvents();
            this._adidas.draw();
          }
        }
      });
    SocketIOClient.getInstance()
      .onEvent(END_TALK, async () => {
        await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK3);
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
        this._clueBallWidget.onDrop = async (zone) => {
          if (zone === SCIENTIST_DROP_ZONE_NAME) {
            await this._adidas.transition(AdidasBuilder.TRANSITIONS.START_TALK_BALL);
            console.log('Show ball to scientist');
            this._showedBall = true;
            if (this._showedShoes && this._showedBall) {
              await this._adidas.transition(AdidasBuilder.TRANSITIONS.FINISH_TALK_BALL)
                .then(() => {
                  this.startMatchVideo();
                });
            }
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
        this._shoeBallWidget.onDrop = async (zone) => {
          if (zone === SCIENTIST_DROP_ZONE_NAME) {
            await this._adidas.transition(AdidasBuilder.TRANSITIONS.START_TALK_SHOES);
            this._showedShoes = true;
            if (this._showedShoes && this._showedBall) {
              this._adidas.transition(AdidasBuilder.TRANSITIONS.FINISH_TALK_SHOES)
                .then(() => {
                  this.startMatchVideo();
                });
            }
          }
        };
        break;
      default:
        console.log(`Unknown clue id : ${clueId}`);
    }
  }

  async startMatchVideo() {
    await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK5);
    await this._supporter.transition(SupporterBuilder.TRANSITIONS.FINISH_TALK5)
      .then(() => {
        if (this._video) this._video.domElem.remove();
        this._video = new VideoElementWidget(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, 0, 1, MATCH_VIDEO_PATH);
        this._video.addTo(this.rootElement);
        this._video.playPauseVideo();
        setTimeout(async () => {
          this._video.domElem.remove();
          if (this._endGameBuilder) {
            this._endGameBuilder.destroy();
          }
          this._endGameBuilder = new EndGameBuilder();
          this._endGameBuilder.bindEvents();
          this._endGameBuilder.draw();
          await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK6);
        }, 30000)
      });
  }

  async draw() {
    this._supporter.draw();
    await this._supporter.transition(SupporterBuilder.TRANSITIONS.START_TALK1);
    await this._supporter.transition(SupporterBuilder.TRANSITIONS.FINISH_TALK1);
    this._stadium.draw();
  }

  undraw() {
    if (this._stadium) {
      this._stadium.undraw();
    }
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
