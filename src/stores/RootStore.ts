import { createContext, useContext } from 'react';
import { AuthStore } from './AuthStore';
import { ThemeStore } from './ThemeStore';
import { SettingsStore } from './SettingsStore';

class RootStore {
    auth: AuthStore;
    theme: ThemeStore;
    settings: SettingsStore;

    constructor() {
        this.auth = new AuthStore();
        this.theme = new ThemeStore();
        this.settings = new SettingsStore();
    }
}

export const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);
export const useStores = () => useContext(RootStoreContext);