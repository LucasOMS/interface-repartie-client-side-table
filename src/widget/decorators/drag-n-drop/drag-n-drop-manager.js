/**
 * Manage DragNDropManager singleton class.
 *
 * @type DragNDropManager
 * @private
 */
let instance = null;


class DragNDropManager {
  constructor() {
    if (instance !== null) {
      return instance
    }

    instance = this;

    this._dropWidgets = [];
    return instance
  }

  static getInstance() {
    return new DragNDropManager();
  }

  dropsOn(dragWidget) {
    const res = [];
    for (let i = 0; i < this._dropWidgets.length; ++i) {
      if (collides(dragWidget, this._dropWidgets[i])) {
        res.push(this._dropWidgets[i]);
      }
    }
    return res;

    function collides(widget1, widget2) {
      return !(widget2._x > (widget1._x + widget1.width)
        || (widget2._x + widget2.width) < widget1._x
        || widget2._y > (widget1._y + widget1.height)
        || (widget2._y + widget2.height) < widget1._y)
    }
  }

  addDropWidget(widget) {
    console.log('Add drop zone : ', widget);
    this._dropWidgets.push(widget);
  }
}

export default DragNDropManager;
