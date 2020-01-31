import Subscriber from '../utils/subscriber'

class Builder extends Subscriber {
  constructor() {
    super();
    this.widgets = [];
    this.actions = {};
  }

  bindEvents() {
  }

  draw() {

  }

  undraw() {
  }

  unbindEvents() {
  }

  destroy() {
    this.undraw();
    this.unbindEvents();
  }

  onAction(actionName, callback) {
    this.actions[actionName] = callback;
  }

  async transition() {
    return Promise.resolve();
  }

  emitAction(actionName, data = undefined) {
    if (this.actions[actionName]) {
      this.actions[actionName](data);
    } else {
      super.emitAction(actionName, data);
    }
  }
}

export default Builder;
