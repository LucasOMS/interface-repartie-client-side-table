import Builder from './builder';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import { DEVICE_CONNECTED, DEVICE_DISCONNECTED } from '../SocketIOClient/constants';

export class GameHomeBuilder extends Builder {
  bindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, (data) => {
        this.internalAction('DEVICE_CONNECTED', data);
      });

    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, (data) => {
        this.internalAction('DEVICE_DISCONNECTED', data);
      });
  }

  draw() {
  }

  undraw() {
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, () => {
      });
    SocketIOClient.getInstance()
      .onEvent(DEVICE_DISCONNECTED, () => {
      });
  }

  internalAction(actionName, data = undefined) {
    switch (actionName) {
      case DEVICE_CONNECTED:
        console.log(`Device connected while playing : ${data.device_type}`);
        break;
      case DEVICE_DISCONNECTED:
        console.log(`Device disconnected while playing : ${data.device_type}`);
        break;
      default:
    }
  }

  destroy() {
  }
}
