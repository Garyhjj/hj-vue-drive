import {
    APIGlobalConfig
} from './../../config/apiGlobal';
import {
    BehaviorSubject
} from 'rxjs';
import {
    tap
} from 'rxjs/operators';
import {
    replaceQuery,
    isArray
} from '@/utils';

export class AuthService {
    //   auth = false;
    //   authSubject = new BehaviorSubject<boolean>(false);
    //   tokenStoreName = 'tokenMes';
    //   loginPageSubject = new BehaviorSubject<boolean>(false);
    //   user: UserState = {};
    //   tokenEffectTime: number = 1000 * 60 * 20;
    constructor(
        http,
        encryptUtilService,
        util,
        root,
    ) {
        this.authSubject = new BehaviorSubject(false);
        this.loginPageSubject = new BehaviorSubject(false);

        this.tokenEffectTime = 1000 * 60 * 20;;
        this.tokenStoreName = 'tokenMes';
        this.auth = false;

        this.http = http;
        this.encryptUtilService = encryptUtilService;
        this.root = root;
        this.$store = root.$store;
        this.util = util;

        this.updateAuth(this.checkAuth());
        this.http.reqObserve.subscribe(a => this.updateToken());
        this.user = this.$store.state.user;
        root.userChanges.subscribe((u) => {
            this.user = u;
            console.log(u)
        })
        // this.store$
        //     .select(s => s.userReducer)
        //     .subscribe(u => Object.assign(this.user, u));
        // this.getSelfPrivilege();
    }

    login(data) {
        return this.http
            .post(
                APIGlobalConfig.loginUrl,
                this.getNewToken(data.userName, data.password),
            )
            .then(
                (d) => {
                    let user = {};
                    Object.assign(user, d.User);
                    user.modules = d.Modules;
                    user.password = data.password;
                    user.rememberPWD = data.remember;
                    let expires = d.Expires;
                    this.tokenEffectTime = expires - new Date().getTime();
                    this.updateTokenMes(expires, d.Token);
                    this.auth = true;
                    this.updateAuth(true);
                    this.$store.commit('loginIn', user);
                    return user;
                }
            );
    }

    updateToken() {
        let tokenMes = this.getTokenMes();
        if (tokenMes) {
            let expires = tokenMes.expires;
            let time = new Date().getTime();
            if (expires > time && expires < time + this.tokenEffectTime * 0.5) {
                let user = this.user;
                this.login({
                    userName: user.USER_NAME,
                    password: user.password,
                    remember: user.rememberPWD,
                });
            }
        }
    }

    getSelfPrivilege() {
        this.authSubject.subscribe(a => {
            if (a) {
                const send = {
                    moduleID: ''
                };
                this.http
                    .get(replaceQuery(APIGlobalConfig.getSelfPrivilege, send))
                    .subscribe(
                        (p) => {
                            // this.$store.dispatch(new UserUpdatePrivilege(p));
                        },
                        err => this.util.errDeal(err),
                    );
            }
        });
    }

    hasPrivilege(module, fn) {
        const privilege = this.user.privilege;
        if (isArray(privilege)) {
            return !!privilege
                .filter(m => m.ROLE_NAME.indexOf(module) > -1)
                .find(p => p.FUNCTION_URL === fn);
        }
        return false;
    }

    checkAuth() {
        let tokenMes = this.getTokenMes();
        return tokenMes && tokenMes.expires > new Date().getTime();
        // return true;
    }
    updateTokenMes(expires, token) {
        let tokenMes = {
            expires,
            token
        };
        localStorage.setItem(this.tokenStoreName, JSON.stringify(tokenMes));
    }

    getTokenMes() {
        let tokenStr = localStorage.getItem(this.tokenStoreName);
        if (tokenStr) {
            let tokenMes = JSON.parse(tokenStr);
            if (typeof tokenMes === 'object') {
                return tokenMes;
            }
        }
        return null;
    }

    clearTokenMes() {
        localStorage.removeItem(this.tokenStoreName);
    }

    getNewToken(userName, password) {
        let enUsername = this.encryptUtilService.AesEncrypt(
            userName,
            this.encryptUtilService.key,
            this.encryptUtilService.iv,
        );
        let enPassword = this.encryptUtilService.AesEncrypt(
            password,
            this.encryptUtilService.key,
            this.encryptUtilService.iv,
        );
        return {
            userName: enUsername,
            password: enPassword
        };
    }

    updateAuth(auth) {
        this.authSubject.next(auth);
    }
}

// export interface TokenMes {
//   expires: number;
//   token: string;
// }
let instance;
export default {
    getInstance(muti, ...args) {
        if (muti) {
            return new AuthService(...args);
        }
        return instance ? instance : instance = new AuthService(...args);
    },
    instance,
}