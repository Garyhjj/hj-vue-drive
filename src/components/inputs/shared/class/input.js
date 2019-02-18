import {
    deepClone,
    isNumber
} from './../utils/index';

class ShareUtil {
    setDefaultMore(def) {
        const more = this.more || (this.more = {});
        Object.assign(more, def)
    }
}

// export interface InputSet {
//     type ? : InputTypes;
//     editable ? : boolean;
//     placeHolder ? : string;
//     default ? : string | boolean | number;
//     match ? : {
//         fns: {
//             name: string;parmas: any[];params ? : any[]
//         } [];
//         err: string;
//     };
//     more ? : any;
//     hasInit ? : boolean;
// }

export class FileUpload extends ShareUtil {
    constructor(opts) {
        this.setDefaultMore({
            maxCount: 8,
            hideUploadButton: true,
        })
        setDefaultMore(tgus, )
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        this.type = 'fileUpload';
    }
}

export class PhotoUpload extends ShareUtil {
    constructor(opts) {
        this.setDefaultMore({
            pickerFormat: 'string',
            maxCount: 9,
            removable: true,
            addabble: true,
            scanable: true
        })
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        this.type = 'photoUpload';
    }
}

export class ColleagueSearcher extends ShareUtil {
    constructor(opts) {
        this.setDefaultMore({
            pickerFormat: '{EMPNO}',
        })
        opts && Object.assign(this, opts);
        this.type = 'colleagueSearcher';
    }
}

export class Switch extends ShareUtil {
    constructor(opts) {
        // tslint:disable-next-line:no-unused-expression
        this.setDefaultMore({
            falseFormat: 'N',
            trueFormat: 'Y'
        });
        opts && Object.assign(this, opts);
        this.type = 'switch';
    }
}
// export interface CascaderOption {
//     value: string | number;
//     label: string | number;
//     isLeaf ? : boolean;
//     children ? : CascaderOption[];
// }
// export interface CascaderLazySet {
//     value: string | number;
//     lazyLayer: number;
//     isLeaf ? : boolean;
//     API ? : string;
//     params ? : string[];
// }
export class Cascader extends ShareUtil {
    // type: InputTypes;
    // placeHolder ? : string;
    // more ? : {
    //     cascaderLazySets ? : CascaderLazySet[];
    //     properties: string[];
    //     options ? : CascaderOption[];
    // };
    constructor(opts) {
        this.setDefaultMore(null);
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        const lazySet = this.more && this.more.cascaderLazySets;
        if (lazySet && lazySet.length > 0) {
            lazySet.sort((a, b) => -a.lazyLayer + b.lazyLayer);
            lazySet[0].isLeaf = true;
            lazySet.reverse();
        }
        this.type = 'cascader';
    }
}

export class DatePicker extends ShareUtil {
    // type: InputTypes;
    // placeHolder ? : string;
    // more ? : {
    //     pickerFormat ? : string;
    //     showFormat ? : string;
    //     showTime ? : boolean;
    //     showMode ? : 'month' | 'day';
    // };
    constructor(opts) {
        this.placeHolder = this.placeHolder || '請選擇時間';
        this.setDefaultMore({
            pickerFormat: 'YYYY-MM-DD',
            showFormat: 'YYYY-MM-DD',
            showTime: false,
            showMode: 'day'
        })
        if (opts) {
            Object.assign(this, opts);
        }
        this.type = 'datePicker';
    }
}

export class TimePicker extends ShareUtil {
    // type: InputTypes;
    // placeHolder ? : string;
    // more ? : {
    //     pickerFormat ? : string;
    //     showFormat ? : string;
    // };
    constructor(opts) {
        this.placeHolder = this.placeHolder || '請選擇時間';
        this.setDefaultMore({
            pickerFormat: 'HH:mm:ss',
            showFormat: 'HH:mm:ss'
        })
        if (opts) {
            Object.assign(this, opts);
        }
        this.type = 'timePicker';
    }
}

export class InputSetDefault {
    // editable: boolean;
    // default ? : string | boolean | number;
    // more ? : any;
    constructor() {
        this.more = {
            editable: true
        };
        this.editable = true;
        this.default = '';
    }
}
export class CheckboxInputSet extends ShareUtil {
    // type: InputTypes = 'checkbox';
    // editable ? : boolean;
    // placeHolder ? : string;
    // default ? : string | boolean | number;
    // more ? : {
    //     options ? : {
    //         property: string;value: string | number
    //     } [];
    // };
    constructor(opts) {
        this.setDefaultMore({
            options: [],
            pickerFormat = 'string'
        })
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        this.type = 'checkbox';
    }
    setOptions(options) {
        const newOpts = [];
        if (options && options.length > 0) {
            options.forEach(o => {
                if (typeof o === 'object') {
                    newOpts.push(o);
                } else if (typeof o === 'string' || typeof o === 'number') {
                    newOpts.push({
                        property: o,
                        value: o
                    });
                }
            });
        }
        // tslint:disable-next-line:no-unused-expression
        newOpts.length > 0 && (this.more.options = newOpts);
    }
}

export class SelectInputSet extends ShareUtil {
    // type: InputTypes = 'select';
    // editable ? : boolean;
    // placeHolder ? : string;
    // default ? : string | boolean | number;
    // more ? : {
    //     options ? : {
    //         property: string;value: string | number
    //     } [];
    //     lazyAPI ? : string;
    //     lazyParams ? : string[];
    //     lazyAPIUserMes ? : any;
    // };
    constructor(opts) {
        this.setDefaultMore({
            options: []
        });
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        this.type = 'select';
    }
    setOptions(options) {
        const newOpts = [];
        if (options && options.length > 0) {
            options.forEach(o => {
                if (typeof o === 'object') {
                    newOpts.push(o);
                } else if (typeof o === 'string' || typeof o === 'number') {
                    newOpts.push({
                        property: o,
                        value: o
                    });
                }
            });
        }
        // tslint:disable-next-line:no-unused-expression
        newOpts.length > 0 && (this.more.options = newOpts);
    }
}

export class AutoCompleteSet extends ShareUtil {
    // type: InputTypes = 'autoComplete';
    // editable ? : boolean;
    // placeHolder ? : string;
    // default ? : string | boolean | number;
    // more ? : {
    //     options ? : {
    //         property: string;value: string | number
    //     } [];
    //     lazyAPI ? : string;
    //     lazyParams ? : string[];
    //     lazyAPIUserMes ? : any;
    //     isSelection ? : boolean; // 是否只能限定选项内容
    // };
    constructor(opts) {
        this.setDefaultMore({
            options: []
        });
        // tslint:disable-next-line:no-unused-expression
        opts && Object.assign(this, opts);
        this.type = 'autoComplete';
    }
    setOptions(options) {
        const newOpts = [];
        if (options && options.length > 0) {
            options.forEach(o => {
                if (typeof o === 'object') {
                    newOpts.push(o);
                } else if (typeof o === 'string' || typeof o === 'number') {
                    newOpts.push({
                        property: o,
                        value: o
                    });
                }
            });
        }
        // tslint:disable-next-line:no-unused-expression
        newOpts.length > 0 && (this.more.options = newOpts);
    }
}

export class InputSetFactory extends InputSetDefault {
    // hasInit: boolean;
    constructor(opts) {
        super();
        if (opts.hasInit) {
            return Object.assign(this, opts);
        }
        Object.assign(this, this.get(opts.type, opts));
        this.hasInit = true;
    }

    get(type = 'text', opts) {
        switch (type) {
            case 'number':
                return new NumberInputSet(opts);
            case 'select':
                return new SelectInputSet(opts);
            case 'checkbox':
                return new CheckboxInputSet(opts);
            case 'datePicker':
                return new DatePicker(opts);
            case 'timePicker':
                return new TimePicker(opts);
            case 'cascader':
                return new Cascader(opts);
            case 'switch':
                return new Switch(opts);
            case 'colleagueSearcher':
                return new ColleagueSearcher(opts);
            case 'photoUpload':
                return new PhotoUpload(opts);
            case 'textarea':
                return new TextareaInputSet(opts);
            case 'primary':
                return new PrimaryInputSet(opts);
            case 'fileUpload':
                return new FileUpload(opts);
            case 'autoComplete':
                return new AutoCompleteSet(opts);
            case 'inputGroup':
                opts.more = opts.more || {};
                opts = deepClone(opts);
                const mainInputSet = opts.more.mainInputSet;
                // tslint:disable-next-line:no-unused-expression
                mainInputSet &&
                    (opts.more.mainInputSet = new InputSetFactory(mainInputSet));
                const afterInputSet = opts.more.afterInputSet;
                // tslint:disable-next-line:no-unused-expression
                afterInputSet &&
                    (opts.more.afterInputSet = new InputSetFactory(afterInputSet));
                return opts;
            case 'text':
            default:
                return new TextInputSet(opts);
        }
    }
}

// export type InputTypes = |
//     'text' |
//     'number' |
//     'rate' |
//     'select' |
//     'datePicker' |
//     'timePicker' |
//     'cascader' |
//     'switch' |
//     'colleagueSearcher' |
//     'photoUpload' |
//     'textarea' |
//     'primary' |
//     'checkbox' |
//     'fileUpload' |
//     'autoComplete' |
//     'inputGroup';

export class TextInputSet {
    // type: InputTypes;
    // placeHolder ? : string;
    // default ? : string | boolean | number;
    // match ? : {
    //     fns: {
    //         name: string;parmas: any[]
    //     } [];
    //     err: string;
    // };
    constructor(opts) {
        if (opts) {
            Object.assign(this, opts);
        }
        this.type = 'text';
    }
}
export class TextareaInputSet {
    // type: InputTypes;
    // editable ? : boolean;
    // placeHolder ? : string;
    // default ? : string | boolean | number;
    // match ? : {
    //     fns: {
    //         name: string;parmas: any[]
    //     } [];
    //     err: string;
    // };
    constructor(opts) {
        if (opts) {
            Object.assign(this, opts);
        }
        this.type = 'textarea';
    }
}

export class NumberInputSet extends ShareUtil {
    // type: InputTypes;
    // default ? : number;
    // more ? : {
    //     min ? : number;
    //     max ? : number;
    //     step ? : number;
    //     editable ? : boolean;
    // };
    constructor(opts) {
        this.setDefaultMore({
            editable: true,
            step: 1,
            max: Infinity,
            min: -Infinity
        })
        this.more = this.more || {
            editable: true
        };
        // this.more.step = this.more.step || 1;
        // this.more.max = isNumber(this.more.max) ? this.more.max : Infinity;
        // this.more.min = isNumber(this.more.min) ? this.more.min : -Infinity;
        this.type = 'number';
        this.default = Number(this.default);
    }
}

export class PrimaryInputSet {
    // type: InputTypes;
    // default ? : number;
    constructor(opts) {
        if (opts) {
            Object.assign(this, opts);
        }
        this.default = this.default || 0;
        this.type = 'primary';
    }
}