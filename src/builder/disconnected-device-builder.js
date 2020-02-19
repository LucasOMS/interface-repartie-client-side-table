import $ from 'jquery/dist/jquery.min';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import { DisconnectedDeviceDialogWidget } from '../widget/images/disconnected-device-dialog-widget';
import { DEVICE_CONNECTED } from '../utils/constants';
import SocketIOClient from '../SocketIOClient/SocketIOClient';
import Builder from './builder';

export class DisconnectedDeviceBuilder extends Builder {
  static get EXTERNAL_ACTION() {
    return { DISCONNECTED_DEVICE_REACT: 'DISCONNECTED_DEVICE_REACT' }
  }

  constructor(deviceType) {
    super();
    this._deviceType = deviceType;
  }

  bindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, () => {
        console.log('Device reconnected');
        this.emitAction(DisconnectedDeviceBuilder.EXTERNAL_ACTION.DISCONNECTED_DEVICE_REACT);
      });
  }

  unbindEvents() {
    SocketIOClient.getInstance()
      .onEvent(DEVICE_CONNECTED, () => {
      });
  }

  draw() {
    this._warningWidget = new DisconnectedDeviceDialogWidget((WINDOW_WIDTH / 2) - (712 / 2),
      (WINDOW_HEIGHT / 2) - (442 / 2), 712, 442, this._deviceType);
    this._warningWidget.onClick = () => {
      console.log('Continue without device');
      this.emitAction(DisconnectedDeviceBuilder.EXTERNAL_ACTION.DISCONNECTED_DEVICE_REACT);
    };
    this._warningWidget.addTo('#app');
  }

  undraw() {
    this._warningWidget.domElem.remove();
  }

  addTo(id) {
    $(id)
      .append(this._domElem);
  }
}
