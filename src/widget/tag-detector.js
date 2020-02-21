import TUIOWidget from 'tuiomanager/core/TUIOWidget';

export class TagDetector extends TUIOWidget {
  constructor() {
    super(0, 0, 0, 0);
    this.onTag = () => {
    }
  }

  onTagCreation(tuioTag) {
    super.onTagCreation(tuioTag);
    this.onTag(tuioTag);
  }
}
