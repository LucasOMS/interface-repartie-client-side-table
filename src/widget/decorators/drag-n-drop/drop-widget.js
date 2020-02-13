import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import DragNDropManager from './drag-n-drop-manager';

export class DropWidget extends ElementWidget {
  /**
   *
   * @param {String} dropzoneName to handle onDrop on draggable widgets
   * @param {ElementWidget} widget
   */
  constructor(dropzoneName, widget) {
    super(widget.internX, widget.internY, widget.internWidth, widget.internHeight, widget._currentAngle, widget.scale);
    // Remove position of wrapped widget
    widget.domElem.css('position', 'initial')
      .css('height', '100%')
      .css('width', '100%')
      .css('transform', '');
    this._domElem = $('<div>')
      .css('width', `${this.width}px`)
      .css('height', `${this.height}px`)
      .css('position', 'absolute')
      .css('z-index', `${this.zIndex}`)
      .css('left', `${widget.internX}px`)
      .css('top', `${widget.internY}px`)
      .css('transform', `rotate(${this._currentAngle}deg)`)
      .css('transform-origin', `scale(${this.scale})`)
      .append(widget.domElem);

    widget.canZoom(false, false);
    widget.canRotate(false, false);
    widget.canMove(false, false);
    widget.canDelete(false, false);
    this.canZoom(widget.canZoomTangible, widget.canZoomTactile);
    this.canRotate(widget.canRotateTangible, widget.canRotateTactile);
    this.canMove(widget.canMoveTangible, widget.canMoveTactile);
    this.canDelete(widget.canDeleteTangible, widget.canDeleteTactile);

    this.dropzoneName = dropzoneName;
    DragNDropManager.getInstance()
      .addDropWidget(this);
  }
}
