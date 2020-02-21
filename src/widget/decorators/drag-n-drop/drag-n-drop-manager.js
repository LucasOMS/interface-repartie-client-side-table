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
      return !(widget2.internX > (widget1.internX + widget1.width)
        || (widget2.internX + widget2.width) < widget1.internX
        || widget2.internY > (widget1.internY + widget1.height)
        || (widget2.internY + widget2.height) < widget1.internY)
    }
  }

  addDropWidget(widget) {
    this._dropWidgets.push(widget);
  }
}

export default DragNDropManager;
