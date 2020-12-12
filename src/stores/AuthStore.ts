import { makeObservable, observable } from 'mobx';
import { Storage as storage } from '../utils/Storage';

export class AuthStore {
    auth: string = "";
    isLoading: boolean = false;
    errorMessage: string = "";

    constructor() {
        makeObservable(this, {
            auth: observable, 
            isLoading: observable,
            errorMessage: observable
        });
        this.auth = storage.getAuthToken();
    }


    isAuthenticated() : boolean {
        return this.auth.length > 0;
    }

    hasError(): boolean {
        return this.errorMessage.length > 0;
    }
}
