class Subscriber {
  emitAction(actionName, data = undefined) {
    console.log(`Default event handle : ${actionName}, data : ${data}`);
  }
}

export default Subscriber
