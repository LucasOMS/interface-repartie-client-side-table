/**
 * @author Lucas OMS <lucas.oms@hotmail.fr>
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';

/**
 * Main class to manage StaticImageWidget.
 *
 * @class ImageWidget
 */
class ImageClicWidget extends ElementWidget {
  /**
   * ImageWidget constructor.
   *
   * @constructor
   * @param {number} x - ImageWidget's upperleft coin abscissa.
   * @param {number} y - ImageWidget's upperleft coin ordinate.
   * @param {number} width - ImageWidget's width.
   * @param {number} height - ImageWidget's height.
   * @param {string} imgSrc
   */
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height, 0, 1);
    this._domElem = $('<img>');
    this._domElem.attr('src', imgSrc);
    this._domElem.attr('id', this.id);
    this._domElem.css('width', `${width}px`);
    this._domElem.css('height', `${height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    this._domElem.css('z-index', `${this.zIndex}`);

    this.canMove(false, false);
    this.canDelete(false, false);
    this.canRotate(false, false);
    this.canZoom(false, false);

    this._initialZindex = this.zIndex;
    this.shouldGoOnTop = false;
  }

  onTouchDeletion(tuioTouchId) {
    super.onTouchDeletion(tuioTouchId);
    const tuioTouch = this._lastTouchesValues[tuioTouchId];
    if (tuioTouch && document.elementFromPoint(tuioTouch.x, tuioTouch.y).id === this.id && this.onClick) {
      this.onClick(tuioTouch);
    }
  }

  onClick(touch) {
    console.warn('Unhandle touch action on ImageClicWidget : ', touch);
  }
}

export default ImageClicWidget;
