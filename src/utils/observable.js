class Observable {
  /**
   * @member {Subscriber[]} subscribers
   */
  constructor() {
    this.subscribers = []
  }

  doAction(actionName, data) {
    this.subscribers.forEach((sub) => {
      sub.handleAction(actionName, data);
    })
  }
}

export default Observable
