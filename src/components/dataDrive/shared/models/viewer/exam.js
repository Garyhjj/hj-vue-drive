import { DataViewSet } from '../index';

export class ExamViewSet {
  // type: DataViewType;
  // title?: string;
  // hasInited?: boolean;
  constructor(opts) {
    if (opts) {
      Object.assign(this, opts);
    }
    this.type = 'exam';
    this.hasInited = true;
  }
}
