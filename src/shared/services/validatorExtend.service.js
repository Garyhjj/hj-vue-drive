 class ValidatorExtendService {
     constructor() {}

     /**
      * 必须填
      * @return {ValidatorFn} [验证器]
      */
     required() {
         return (ctrl) => {
             let value = ctrl.value;
             return value || value === 0 ?
                 null : {
                     required: true,
                 };
         };
     }

     isNull() {
         return (ctrl) => {
             let value = ctrl.value;
             return !(value || value === 0) ?
                 null : {
                     null: true,
                 };
         };
     }

     /**
      * 字符串最小长度
      * @param  {number}   num 传入的长度要求
      * @return {ValidatorFn}     验证器
      */
     minLength(num) {
         return (ctrl) => {
             let value = ctrl.value;
             if (value === void 0 || value === null) {
                 return null;
             }
             value = value + '';
             let valueL = value.length;
             return !value || valueL >= num ?
                 null : {
                     minlength: {
                         requiredLength: num,
                         actualLength: valueL,
                     },
                 };
         };
     }

     /**
      * 字符串最大长度
      * @param  {number}   num 传入的长度要求
      * @return {ValidatorFn}     验证器
      */
     maxLength(num) {
         return (ctrl) => {
             let value = ctrl.value;
             if (value === void 0 || value === null) {
                 return null;
             }
             value = value + '';
             let valueL = value.length;
             return !value || valueL <= num ?
                 null : {
                     maxlength: {
                         requiredLength: num,
                         actualLength: valueL,
                     },
                 };
         };
     }

     /**
      * 限制最大数值
      * @param  {number}   num 传入的长度要求
      * @return {ValidatorFn}     验证器
      */
     max(num) {
         return (ctrl) => {
             let value = Number(ctrl.value);
             return !value || value <= num ?
                 null : {
                     max: {
                         requiredValue: num,
                         actualValue: value,
                     },
                 };
         };
     }

     /**
      * 限制最小数值
      * @param  {number}   num 传入的长度要求
      * @return {ValidatorFn}     验证器
      */
     min(num) {
         return (ctrl) => {
             let value = Number(ctrl.value);
             return !value || value >= num ?
                 null : {
                     min: {
                         requiredValue: num,
                         actualValue: value,
                     },
                 };
         };
     }

     /**
      * 限制字符串长度的范围
      * @param  {number[]} bet 长度为2的数组、例‘[2,6]’
      * @return {ValidatorFn}     验证器
      */
     betweenLength(bet) {
         if (bet instanceof Array && bet.length > 1) {
             return (ctrl) => {
                 let value = ctrl.value;
                 if (!value) {
                     return null;
                 }
                 let valueL = value.length;
                 return !value || (valueL >= bet[0] && valueL <= bet[1]) ?
                     null : {
                         betweenLength: {
                             requiredLength: bet[0] + '-' + bet[1],
                             actualLength: valueL,
                         },
                     };
             };
         } else {
             throw new Error('参数必须是数组类型,并且长度不能小于1');
         }
     }

     /**
      * 根据输入的正则验证
      * @param  {any}    reg   正则表达式
      * @return {ValidatorFn}     验证器
      */
     regex(reg) {
         return (ctrl) => {
             let value = ctrl.value;
             let regx = new RegExp(reg);
             return regx.test(value) ?
                 null : {
                     RegExp: regx.toString(),
                 };
         };
     }

     /**
      * 检测是否为邮箱
      * @return {ValidatorFn} 验证器
      */
     email() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value ||
                 /^([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]*)*\@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])*/.test(
                     value,
                 ) ?
                 null : {
                     email: true,
                 };
         };
     }

     /**
      * 长度限制
      * @param  {number}   length 字符长度
      * @return {ValidatorFn}        验证器
      */
     length(length) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             let valueL = value.length;
             return !value || valueL === Number(length) ?
                 null : {
                     length: {
                         requiredLength: Number(length),
                         actualLength: valueL,
                     },
                 };
         };
     }

     /**
      * 限制数值最大最小值
      * @param  {number[]} bet 大小范围
      * @return {ValidatorFn}     验证器
      */
     between(bet) {
         if (bet instanceof Array && bet.length > 1) {
             return (ctrl) => {
                 let value = Number(ctrl.value);
                 return !value || (value >= bet[0] && value <= bet[1]) ?
                     null : {
                         between: {
                             requiredValue: bet[0] + '-' + bet[1],
                             actualValue: value,
                         },
                     };
             };
         } else {
             throw new Error('参数必须是数组类型,并且长度不能小于1');
         }
     }

     /**
      * 为整数
      * @return {ValidatorFn} 验证器
      */
     integer() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value || /^\-?\d+$/.test(value) ?
                 null : {
                     integer: true,
                 };
         };
     }

     /**
      * 为数字
      * @return {ValidatorFn} 验证器
      */
     number() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value || !isNaN(Number(value)) ?
                 null : {
                     number: true,
                 };
         };
     }

     /**
      * 为移动号码
      * @return {ValidatorFn} 验证器
      */
     mobile() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value || /^1\d{10}$/.test(value) ?
                 null : {
                     mobile: true,
                 };
         };
     }

     /**
      * 为固话号码
      * @return {ValidatorFn} 验证器
      */
     telephone() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value || /^\d{4}\-\d{8}$/.test(value) ?
                 null : {
                     telephone: true,
                 };
         };
     }

     /**
      * 为网址
      * @return {ValidatorFn} 验证器
      */
     url() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             return !value ||
                 /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(
                     value,
                 ) ?
                 null : {
                     url: true,
                 };
         };
     }

     /**
      * 与同级栏位进行内容对比，是否相等
      * @param  {string}   name 同级栏位名称
      * @return {ValidatorFn}      验证器
      */
     equalTo(name) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!ctrl.parent) {
                 return null;
             }
             if (!ctrl.parent.controls[name]) {
                 throw new Error('同级栏位中没有' + name + '栏位');
             }
             let anotherVal = ctrl.parent.controls[name].value || null;
             return anotherVal && value === anotherVal ?
                 null : {
                     equalTo: {
                         target: name,
                     },
                 };
         };
     }

     /**
      * 与同级栏位进行日期比对，比另一个栏位要大
      * @param  {string}   name 同级栏位名称
      * @return {ValidatorFn}      验证器
      */
     dateBigger(name) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!ctrl.parent) {
                 return null;
             }
             if (!ctrl.parent.controls[name]) {
                 throw new Error('同级栏位中没有' + name + '栏位');
             }
             const anotherControl = ctrl.parent.controls[name];
             let anotherVal = anotherControl.value || null;
             if (anotherVal) {
                 if (new Date(value).getTime() - new Date(anotherVal).getTime() > 0) {
                     setTimeout(() => {
                         if (anotherControl.invalid) {
                             anotherControl.setValue(anotherVal);
                         }
                     }, 100);
                     return null;
                 } else {
                     return {
                         dateBigger: {
                             target: name,
                         },
                     };
                 }
             } else {
                 return null;
             }
         };
     }

     /**
      * 与同级栏位进行日期比对，比另一个栏位要小
      * @param  {string}   name 同级栏位名称
      * @return {ValidatorFn}      验证器
      */
     dateSmall(name) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!ctrl.parent) {
                 return null;
             }
             if (!ctrl.parent.controls[name]) {
                 throw new Error('同级栏位中没有' + name + '栏位');
             }
             const anotherControl = ctrl.parent.controls[name];
             let anotherVal = anotherControl.value || null;
             if (anotherVal) {
                 if (new Date(value).getTime() - new Date(anotherVal).getTime() < 0) {
                     setTimeout(() => {
                         if (anotherControl.invalid) {
                             anotherControl.setValue(anotherVal);
                         }
                     }, 100);
                     return null;
                 } else {
                     return {
                         dateSmall: {
                             target: name,
                         },
                     };
                 }
             } else {
                 return null;
             }
         };
     }

     /**
      * 与同级栏位进行數值比对，比另一个栏位要小
      * @param  {string}   name 同级栏位名称
      * @return {ValidatorFn}      验证器
      */
     numberSmaller(name) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!ctrl.parent) {
                 return null;
             }
             if (!ctrl.parent.controls[name]) {
                 throw new Error('同级栏位中没有' + name + '栏位');
             }
             const anotherControl = ctrl.parent.controls[name];
             let anotherVal = anotherControl.value || null;
             if (anotherVal) {
                 if (value - anotherVal <= 0) {
                     setTimeout(() => {
                         if (anotherControl.invalid) {
                             anotherControl.setValue(anotherVal);
                         }
                     }, 100);
                     return null;
                 } else {
                     return {
                         numberSmaller: {
                             target: name,
                         },
                     };
                 }
             } else {
                 return null;
             }
         };
     }

     numberBigger(name) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!ctrl.parent) {
                 return null;
             }
             if (!ctrl.parent.controls[name]) {
                 throw new Error('同级栏位中没有' + name + '栏位');
             }
             const anotherControl = ctrl.parent.controls[name];
             let anotherVal = anotherControl.value || null;
             if (anotherVal) {
                 if (value - anotherVal >= 0) {
                     setTimeout(() => {
                         if (anotherControl.invalid) {
                             anotherControl.setValue(anotherVal);
                         }
                     }, 100);
                     return null;
                 } else {
                     return {
                         numberBigger: {
                             target: name,
                         },
                     };
                 }
             } else {
                 return null;
             }
         };
     }

     /**
      * 检查小数位的个数
      * @param  {number} num   小数位的个数
      * @return {ValidatorFn}     验证器
      */
     toFix(num) {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             let reg = '^([\\d]+)(\\.[\\d]{' + Number(num) + '})?$';
             return new RegExp(reg).test(value) ?
                 null : {
                     toFix: true,
                 };
         };
     }

     jsonString() {
         return (ctrl) => {
             let value = ctrl.value;
             if (!value) {
                 return null;
             }
             try {
                 JSON.parse(value);
             } catch (e) {
                 return {
                     jsonString: true,
                 };
             }
             return null;
         };
     }

     /**
      * 自定位验证规则, fn(ctrl,opt)
      * @param  {any} fn  自定义的规则函数，参数（ctrl,opt）
      * @param  {any}      opt 自定义参数
      * @return {ValidatorFn}     验证器
      */
     selfDefine(fn, opt) {
         return (ctrl) => {
             return fn.call(this, ctrl, opt);
         };
     }
 }
 let instance;
 export default {
     getInstance(muti) {
         if (muti) {
             return new ValidatorExtendService();
         }
         return instance ? instance : instance = new ValidatorExtendService();
     }
 }