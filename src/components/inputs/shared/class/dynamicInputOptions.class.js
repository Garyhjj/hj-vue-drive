import {
    InputSetFactory
} from './input';

export class DynamicFormInput {
    //   isRequired: boolean;
    //   isReadonly:boolean;
    //   validators: { required: boolean, message: string,validator,min,max }[] = null;
    constructor(
        label,
        property,
        inputOptions
        /*: {
             type: string;
             default?: any;
             more?: { [prop: string]: any };
             isRequire?: boolean;
           }*/
        ,
    ) {
        this.label = label;
        this.property = property;
        this.inputOptions = inputOptions;
        if (this.inputOptions) {
            this.inputOptions = new InputSetFactory(
                Object.assign({}, this.inputOptions),
            );
        }
        this.validators = [];
    }

    required() {
        this.isRequired = true;
        if (this.required) {
            (this.validators || (this.validators = [])).push({
                required: true,
                message: '不能为空'
            });
        }
        return this;
    }

    readonly() {
        this.isReadonly = true;
        return this;
    }

    set default(a) {
        this.inputOptions.default = a;
    }
    get default() {
        return this.inputOptions.default || null;
    }
    mapValidator(f, v) {
        return (rule, value, callback) => {
            const {
                field
            } = rule;
            if (!f) {
                callback([]);
            }
            Promise.resolve(v(f.controls[field])).then(b => {
                callback(!b ? [] : "err");
            });
        };
    }
    setValidator(newValidators) {
        const validators = (this.validators || (this.validators = []));
        [].concat(newValidators).forEach((v) => {
            const {
                validator
            } = v;
            if (typeof validator === 'function') {
                v._validator = validator;
            }
            validators.push(v)
        })
        return this;
    }
    registerValidators(f) {
        const old = this.formInstance;
        if (old !== f) {
            this.formInstance = f;
            this.validators.forEach((v) => {
                const {
                    _validator
                } = v;
                if (typeof _validator === 'function') {
                    v.validator = this.mapValidator(f, _validator);
                }
            });
        }
        return this.validators;
    }
}