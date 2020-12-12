import { createContext, useContext } from 'react';
import { AuthStore } from './AuthStore';
import { ThemeStore } from './ThemeStore';
import { SettingsStore } from './SettingsStore';
import { CalendarStore } from './CalendarStore';

class RootStore {
    auth: AuthStore;
    theme: ThemeStore;
    settings: SettingsStore;
    calendar: CalendarStore;

    constructor() {
        this.auth = new AuthStore();
        this.theme = new ThemeStore();
        this.settings = new SettingsStore();
        this.calendar = new CalendarStore();
    }
}

export const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);
export const useStores = () => useContext(RootStoreContext);