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
class StaticImageWidget {
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
    this._domElem = $('<img>');
    this._domElem.attr('src', imgSrc);
    this._domElem.attr('id', this.id);
    this._domElem.css('width', `${width}px`);
    this._domElem.css('height', `${height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    ElementWidget.zIndexGlobal += 1;
    this._domElem.css('z-index', ElementWidget.zIndexGlobal);
  }

  /**
   * StaticImageWidget's domElem.
   *
   * @returns {JQuery Object} ImageWidget's domElem.
   */
  get domElem() {
    return this._domElem;
  }

  addTo(id) {
    $(id)
      .append(this._domElem);
  }
}

export default StaticImageWidget;
