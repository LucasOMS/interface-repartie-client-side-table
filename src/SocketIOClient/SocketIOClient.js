/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import io from 'socket.io-client'

import { REGISTER_DEVICE, REGISTRATION_ASK } from './constants'

/**
 * Manage SocketIOClient singleton class.
 *
 * @type SocketIOClient
 * @private
 */
let socketIOClientInstance = null;

/**
 * Main class to manage SocketIOClient.
 *
 * @class SocketIOClient
 */
class SocketIOClient {
  /**
   * SocketIOClient constructor.
   *
   * @constructor
   */
  constructor() {
    if (socketIOClientInstance !== null) {
      return socketIOClientInstance
    }

    socketIOClientInstance = this;

    this._client = null;

    return socketIOClientInstance
  }

  /**
   * Init and start SocketIOClient.
   *
   * @method getInstance
   * @static
   * @returns {SocketIOClient} The SocketIOClient instance.
   */
  static getInstance() {
    return new SocketIOClient()
  }

  /**
   * Init and start SocketIOClient.
   *
   * @method start
   * @param {string} socketIOUrl - Socket IO Server's url. Default : 'http://localhost:10000/'
   */
  start(socketIOUrl = 'http://localhost:10000/') {
    this._client = io(socketIOUrl);
    this._client.on(REGISTRATION_ASK, () => {
      console.log('Type of device ask by the server');
      this._registerDevice();
    });
    this._client.on('PING', () => {
      console.log('Pong');
    });
  }

  /**
   * Define the socket as Table's one
   *
   * @method registerDevice
   */
  _registerDevice() {
    this._client.emit(REGISTER_DEVICE, { device_type: 'TABLE' });
    console.log('Registered as TABLE device');
  }

  sendEvent(eventName) {
    this._client.emit(eventName);
  }
}

export default SocketIOClient
