/**
 * @author Christian Brel <ch.brel@gmail.com>
 */

import io from 'socket.io-client'

import { REGISTER_DEVICE, REGISTRATION_ASK } from '../utils/constants'

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
    this._activeEvents = [];
    this._eventsAndCallback = {};
    this._listeningEvents = [];


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
      this._registerDevice();
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

  sendEvent(eventName, data = {}) {
    this._client.emit(eventName, data);
  }

  /**
   * @param {string} eventName
   * @param {function} callback
   */
  onEvent(eventName, callback) {
    this.enableEvent(eventName); // Activate the event
    this._eventsAndCallback[eventName] = callback;
    if (!this.isBoundEvent(eventName)) {
      this._client.on(eventName, (data) => {
        if (this.isActiveEvent(eventName)) {
          this._eventsAndCallback[eventName](data);
        }
      })
    }
    this._listeningEvents.push(eventName);
  }

  isBoundEvent(eventName) {
    return this._listeningEvents.indexOf(eventName) > -1;
  }

  removeEventCallback(eventName) {
    this._eventsAndCallback[eventName] = undefined;
  }

  isActiveEvent(eventName) {
    return this._activeEvents.indexOf(eventName) > -1;
  }

  disableEvent(eventName) {
    // Remove from array
    this._activeEvents.splice(this._activeEvents.indexOf(eventName), 1);
  }

  enableEvent(eventName) {
    this._activeEvents.push(eventName);
  }
}

export default SocketIOClient
