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

const shareMethods = {
    calallValid() {
        const fieldsMeta = this.fieldsStore.fieldsMeta;
        if (!fieldsMeta) return false;
        let status = Object.keys(fieldsMeta).every(i => this[`${i}_isValid`]);
        const childrenForm = this.childrenForm;
        if (status && childrenForm) {
            const keys = Object.keys(childrenForm);
            let lg = keys.length;
            while (lg--) {
                if (!childrenForm[keys[lg]].every((c) => c.isValid)) {
                    status = false;
                    break;
                };
            }
        }
        if (status !== this.isValid) {
            this.isValid = status;
            this.validChanges.next(status);
        }
    },
    calValid(key) {
        const form = this,
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
    addChildForm(key, child) {
        const parent = this;
        const children = parent.childrenForm || (parent.childrenForm = {}),
            keyChildren = children[key] || (children[key] = []);
        child = Array.from(new Set([].concat(child)));
        const controls = parent.controls,
            control = controls[key] || (controls[key] = []),
            out = [];
        child.forEach((c) => {
            if (!c || !c._isVue || c === parent) {
                return;
            }
            if (!c._isAltered) {
                alterForm(c);
            }
            keyChildren.push(c);
            control.push(c.controls);
            c.validChanges.subscribe(() => shareMethods.calallValid.call(this));
            out.push(c);
        });
        return out;
    },
    addChildFormByNumber(key, number) {
        const parent = this;
        const children = parent.childrenForm || (parent.childrenForm = {}),
            keyChildren = children[key] || (children[key] = []);
        const controls = parent.controls,
            control = controls[key] || (controls[key] = []),
            out = [];
        while (number--) {
            const c = parent.$form.createForm(parent.templateContext);
            if (!c._isAltered) {
                setTimeout(() => alterForm(c), 1000);
            }
            keyChildren.push(c);
            control.push(c.controls);
            c.validChanges.subscribe(() => shareMethods.calallValid.call(this));
            out.push(c);
        }
        return out;
    }
}
export function alterForm(form) {
    if (form && form._isVue) {
        form._isAltered = true;
        const changeSet = new Set(),
            changeSubject = new Subject(),
            valueChanges = new Subject(),
            validChanges = new Subject(),
            {
                calallValid,
                calValid,
                addChildForm,
                addChildFormByNumber
            } = shareMethods;
        form.validChanges = validChanges;
        form.addChildForm = addChildForm;
        form.addChildFormByNumber = addChildFormByNumber;
        changeSubject
            .asObservable()
            .pipe(debounceTime(300))
            .subscribe(val => {
                const arr = Array.from(val);
                arr.forEach(a => calValid.call(form, a));
                changeSet.clear();
                calallValid.call(form);
            });
        calallValid.call(form)
        const controls = form.controls || (form.controls = {});

        function bindAll() {
            const fieldsMeta = form.fieldsStore.fieldsMeta,
                metaKeys = Object.keys(fieldsMeta);
            if (metaKeys.length === 0) {
                return setTimeout(() => bindAll(), 300);
            }
            metaKeys.forEach(i => {
                const property = i;
                const instance = form.instances[property];
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
                calValid.call(form, property);
                def(control, 'isValid', {
                    get: () => form[`${property}_isValid`]
                });
                def(control, 'value', {
                    get: () => instance.value
                });
            });
        }
        bindAll();
    }
}