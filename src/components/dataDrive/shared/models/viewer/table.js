// import { Subject } from 'rxjs';
// import { DataViewType, DataViewSet } from './index';
// export interface TabelViewSetMore {
//   title?: {
//     enable: boolean;
//   };
//   border_y?: {
//     enable: boolean;
//   };
//   header?: {
//     textColor?: string;
//     textSize?: string;
//     bgColor?: string;
//   };
//   body?: {
//     textColor?: string;
//     textSize?: string;
//     bgColor?: string;
//     rules?: {
//       matches: any[][];
//       textColor?: string;
//       textSize?: string;
//       bgColor?: string;
//     }[];
//   };
//   addOrder?: boolean;
//   fixedHeader?: {
//     enable: boolean;
//     scrollHeight?: number | 'auto';
//     width?: string[];
//     autoScroll?: {
//       interval: number;
//       loop?: boolean;
//     };
//   };
//   pageSet?: {
//     enable: boolean;
//     count?: number;
//   };
//   size?: 'default' | 'middle' | 'small';
//   footer?: {
//     enable: boolean;
//     content: string;
//   };
//   showAction?: boolean;
//   paramsOut?: {
//     name: string;
//     params?: string[];
//   };
//   linkToPhone?: {
//     name: string;
//     url: string;
//     local?: string;
//   };
//   showCheckbox?: boolean;
//   showIndex?: boolean;
// }
export class TabelViewSet {
  // type: DataViewType;
  // title?: string;
  // more: TabelViewSetMore;
  // hasInited?: boolean;
  // isScrolling?: boolean;
  // private _scrollSet?: boolean;
  // private scrollSetSubject = new Subject<any>();
  // private _cbList;
  // private _forceUpdate: () => void;
  eventNames = {
    onScrollTo: 'onScrollTo',
  };
  constructor(opts) {
    if (opts) {
      Object.assign(this, opts);
    }
    const more = this.more = this.more || {};
    more.title = more.title || { enable: true };
    more.border_y = more.border_y || { enable: false };
    more.pageSet = more.pageSet || { enable: true, count: 10 };
    more.pageSet.count = more.pageSet.count || 10;
    more.size = more.size || 'default';
    more.footer = more.footer || { enable: false, content: '' };
    this.type = 'table';
    this.hasInited = true;
    if (more.fixedHeader && more.fixedHeader.autoScroll) {
      this._scrollSet = true;
    }
    this._cbList = {};
    this.changeBodyFontSize('14px');
    this.changeHeaderFontSize('14px');
  }

  setForceUpdate(fn) {
    this._forceUpdate = fn;
  }

  forceUpdate() {
    if (this._forceUpdate) {
      this._forceUpdate();
    }
  }

  get scrollSet() {
    return this._scrollSet;
  }

  get scrollSetChange() {
    return this.scrollSetSubject.asObservable();
  }

  beginScrolling() {
    this._scrollSet = true;
    this.scrollSetSubject.next(true);
  }

  stopScrolling() {
    this._scrollSet = false;
    this.scrollSetSubject.next(false);
  }
  changeHeaderFontSize(size) {
    this.more = this.more || {};
    this.more.header = this.more.header || {};
    this.more.header.textSize = size;
    this.forceUpdate();
  }
  changeBodyFontSize(size) {
    this.more = this.more || {};
    this.more.body = this.more.body || {};
    this.more.body.textSize = size;
    this.forceUpdate();
  }
  showCheckbox() {
    this.more.showCheckbox = true;
  }
  hideCheckbox() {
    this.more.showCheckbox = false;
  }

  showIndex() {
    this.more.showIndex = true;
  }
  hideIndex() {
    this.more.showIndex = false;
  }

  onScrollTo(callback) {
    let name = this.eventNames.onScrollTo;
    this._cbList[name] = this._cbList[name] || [];
    this._cbList[name].push(callback);
  }

  emitFn(name, ...parmas) {
    if (Array.isArray(this._cbList[name])) {
      this._cbList[name].forEach(fn => {
        fn(...parmas);
      });
    }
  }
}
