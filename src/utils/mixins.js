import {
    Subject
} from "rxjs";
import {
    debounceTime
} from "rxjs/operators";
import {
    isNil
} from './';

const def = Object.defineProperty;
export const formMixins = {
    data() {
        return {
            form: this.$form.createForm(this),
            isValid: true,
            changeSet: new Set(),
            changeSubject: new Subject(),
        };
    },
    beforeMount() {
        this.changeSubject
            .asObservable()
            .pipe(debounceTime(300))
            .subscribe(val => {
                const arr = Array.from(val);
                arr.forEach(a => this.calValid(a));
                this.changeSet.clear();
                this.calallValid();
            });
    },
    mounted() {
        const form = this.form,
            fieldsMeta = form.fieldsStore.fieldsMeta,
            validStaus = form.validStaus || (form.validStaus = {});
        Object.keys(fieldsMeta).forEach(i => {
            const property = i;
            const instance = this.form.instances[property];
            instance.$watch("value", val => {
                this.changeSet.add(property);
                this.changeSubject.next(this.changeSet);
            });
            this.calValid(property);
            def(validStaus, property, {
                get: () => this[`${property}_isValid`]
            });
        });
        this.calallValid();
    },
    methods: {
        calallValid() {
            const fieldsMeta = this.form.fieldsStore.fieldsMeta;
            if (!fieldsMeta) return false;
            this.isValid = Object.keys(fieldsMeta).every(i => this[`${i}_isValid`]);
        },
        calValid(key) {
            const form = this.form;
            const instance = form.instances[key];
            const val = instance.value;
            const meta = form.fieldsStore.fieldsMeta[key];
            const field = form.fieldsStore.fields[key];
            const validKey = `${key}_isValid`;
            if (field && field.errors) {
                this[validKey] = false;
            } else {
                if ((isNil(val) || val === "") && meta.rules.some(r => r.required)) {
                    this[validKey] = false;
                } else {
                    this[validKey] = true;
                }
            }
        },
    }
}