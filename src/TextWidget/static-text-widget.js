import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';

export class StaticTextWidget extends ElementWidget {
  constructor(text, x, y, width, height, initialRotation, initialScale, options) {
    super(x, y, width, height, initialRotation, initialScale);
    this.canMove(false, false);
    this.canDelete(false, false);
    this.canRotate(false, false);
    this.canZoom(false, false);
    const optionsC = {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'regular',
    };
    Object.assign(optionsC, options);
    this._domElem = $('<div/>')
      .text(text)
      .css('transform', `rotate(${initialRotation}deg)`)
      .css('position', 'absolute')
      .css('top', `${y}px`)
      .css('left', `${x}px`)
      .css('width', width)
      .css('text-align', optionsC.textAlign)
      .css('font-size', `${optionsC.fontSize}px`)
      .css('font-weight', optionsC.fontWeight);
  }

  addTo(id) {
    $(id)
      .append(this.domElem);
  }
}
