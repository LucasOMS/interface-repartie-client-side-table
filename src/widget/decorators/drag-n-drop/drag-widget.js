import $ from 'jquery/dist/jquery.min';
import TUIOManager from 'tuiomanager/core/TUIOManager';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import DragNDropManager from './drag-n-drop-manager';

export class DragWidget extends ElementWidget {
  /**
   *
   * @param {ElementWidget} widget
   */
  constructor(widget) {
    super(widget.internX, widget.internY, widget.internWidth, widget.internHeight, widget._currentAngle, widget.scale);
    // Remove position of wrapped widget
    TUIOManager.getInstance()
      .removeWidget(widget);
    widget.domElem.css('position', 'initial')
      .css('height', '100%')
      .css('width', '100%')
      .css('transform', '');
    this._domElem = $('<div>')
      .css('width', `${this.width}px`)
      .css('height', `${this.height}px`)
      .css('position', 'absolute')
      .css('z-index', `${this.zIndex}`)
      .css('left', `${this.x}px`)
      .css('top', `${this.y}px`)
      .css('transform', `rotate(${this._currentAngle}deg)`)
      .css('transform-origin', `scale(${this.scale})`)
      .append(widget.domElem);

    this.canZoom(widget.canZoomTangible, widget.canZoomTactile);
    this.canRotate(widget.canRotateTangible, widget.canRotateTactile);
    this.canMove(true, true);
    this.canDelete(widget.canDeleteTangible, widget.canDeleteTactile);

    this.onDrop = () => {
    };
  }

  onTouchDeletion(tuioTouchId) {
    const touch = this.touches[tuioTouchId];
    super.onTouchDeletion(tuioTouchId);
    // Stop there if the touch release isn't on this widget
    if (!touch) {
      return;
    }
    // Check if the widget is within a drop zone
    const dropOnWidgets = DragNDropManager.getInstance()
      .dropsOn(this);

    if (dropOnWidgets.length > 0) {
      for (let i = 0; i < dropOnWidgets.length; ++i) {
        this.onDrop(dropOnWidgets[i].dropzoneName);
      }
    }
  }
}
