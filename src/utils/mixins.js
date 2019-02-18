import {
    Subject
} from "rxjs";
import {
    debounceTime,
    filter,
    map
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
            valueChanges: new Subject(),
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
            controls = form.controls || (form.controls = {}),
            changeSet = this.changeSet,
            changeSubject = this.changeSubject;
        Object.keys(fieldsMeta).forEach(i => {
            const property = i;
            const instance = this.form.instances[property],
                valueChanges = this.valueChanges;
            instance.$watch("value", (newVal, oldVal) => {
                !changeSet.has(property) && changeSet.add(property);
                changeSubject.next(changeSet);
                valueChanges.next({
                    property,
                    params: {
                        newVal,
                        oldVal
                    }
                });
            });
            const control = controls[property] || (controls[property] = {});
            control.valueChanges = valueChanges.asObservable().pipe(filter((data) => data.property === property), map(({
                params
            }) => params));
            this.calValid(property);
            def(control, 'isValid', {
                get: () => this[`${property}_isValid`]
            });
        });
        def(form, 'isValid', {
            get: () => this[`isValid`]
        })
        this.calallValid();
    },
    methods: {
        calallValid() {
            const fieldsMeta = this.form.fieldsStore.fieldsMeta;
            if (!fieldsMeta) return false;
            this.isValid = Object.keys(fieldsMeta).every(i => this[`${i}_isValid`]);
        },
        calValid(key) {
            const form = this.form,
                instance = form.instances[key],
                val = instance.value,
                meta = form.fieldsStore.fieldsMeta[key],
                field = form.fieldsStore.fields[key],
                validKey = `${key}_isValid`;
            let res;
            if (field && field.errors) {
                res = false;
            } else {
                if ((isNil(val) || val === "") && meta.rules.some(r => r.required)) {
                    res = false;
                } else {
                    res = true;
                }
            }
            this[validKey] = res;
        },
    }
}