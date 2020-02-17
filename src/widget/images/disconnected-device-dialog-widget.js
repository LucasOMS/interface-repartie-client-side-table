import $ from 'jquery/dist/jquery.min';
import ElementWidget from 'tuiomanager/widgets/ElementWidget/ElementWidget';
import { TABLET_DISCONNECTED_IMG, VR_DISCONNECTED_IMG } from '../../utils/constants';


export class DisconnectedDeviceDialogWidget extends ElementWidget {
  constructor(x, y, width, height, disconnectedDevice) {
    super(x, y, width, height, 0, 1);
    this.onClick = () => {
    };
    this.canMove(false, false);
    this.canDelete(false, false);
    this.canRotate(false, true);
    this.canZoom(false, true);
    this._domElem = $('<div>')
      .attr('id', this.id)
      .css('width', `${width}px`)
      .css('height', `${height}px`)
      .css('z-index', ElementWidget.zIndexGlobal + 1)
      .css('position', 'absolute')
      .css('left', `${x}px`)
      .css('top', `${y}px`);
    this._domElem.addClass('device_disconnected');
    const img = $('<img>');
    switch (disconnectedDevice) {
      case 'VR':
        img.attr('src', VR_DISCONNECTED_IMG);
        break;
      case 'TABLET':
        img.attr('src', TABLET_DISCONNECTED_IMG);
        break;
      default:
        console.error('Instantiate DisconnectedDeviceDialogWidget with unvalid device type');
    }
    this._domElem.append(img);
    const title = $('<h1>')
      .text('Appareil déconnecté');
    this._domElem.append(title);
    const text = $('<p>')
      .text('Vous pouvez demander à un responsable de le reconnecter ou continuer sans ce dispositif. Certaines étapes pourrons être écourtées en son absence.');
    this._domElem.append(text);
    const button = $('<div>')
      .attr('id', `${this.id}-button`)
      .text('CONTINUER SANS');
    this._domElem.append(button);
  }

  onTouchCreation(tuioTouch) {
    super.onTouchCreation(tuioTouch);
    if (document.elementFromPoint(tuioTouch.x, tuioTouch.y).id === `${this.id}-button`) {
      this.onClick();
    }
  }

  addTo(id) {
    $(id)
      .append(this._domElem);
  }
}
