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

    setValidator(validators) {
        (this.validators || (this.validators = [])).push(validators);
        return this;
    }
}