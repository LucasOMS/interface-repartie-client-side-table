import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';

export class BoundedImageWidget extends ImageElementWidget {
  constructor(x, y, width, height, src) {
    super(x, y, width, height, 0, 1, src);
    this.canMove(true, true);
    this.canDelete(false, false);
    this.canRotate(false, false);
    this.canZoom(false, false);

    if (width < WINDOW_WIDTH || height < WINDOW_HEIGHT) {
      throw new Error('Don\'t use BoundedImageWidget with an image smaller than the viewport');
    }
  }

  moveTo(x, y, angle = null) {
    let newX = x;
    let newY = y;
    const topLeftCorner = {
      x,
      y,
    };
    const bottomRightCorner = {
      x: x + this.width,
      y: y + this.height,
    };
    if ((topLeftCorner.y > 0 && topLeftCorner.y < WINDOW_HEIGHT)) {
      newY = 0;
    }
    if ((bottomRightCorner.x > 0 && bottomRightCorner.x < WINDOW_WIDTH)) {
      newX = this.width - WINDOW_WIDTH;
    }
    if (bottomRightCorner.y > 0 && bottomRightCorner.y < WINDOW_HEIGHT) {
      newY = this.height - WINDOW_HEIGHT;
    }
    if (topLeftCorner.x > 0 && topLeftCorner.x < WINDOW_WIDTH) {
      newX = 0;
    }
    super.moveTo(newX, newY, angle);
  }
}
