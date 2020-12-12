import { Storage as storage } from '../utils/Storage';
import { makeObservable, observable, action, runInAction, reaction } from 'mobx';
import { CalendarEvent } from './CalendarEvent';

export class CalendarStore {
    selectedDate: Date = new Date();
    events: CalendarEvent[];

    constructor() {
        makeObservable(this, {
            selectedDate: observable
        });
        // this.selectedDate = new Date("2020-12-11");

        this.events = [
            new CalendarEvent(new Date("2020-12-01 14:30:00"), new Date("2020-12-01 14:45:00"), "Möte #1", "Lite description"), 
            new CalendarEvent(new Date("2020-12-02 14:30:00"), new Date("2020-12-02 14:45:00"), "Möte #2", "Lite description"), 
            new CalendarEvent(new Date("2020-12-03 14:30:00"), new Date("2020-12-03 14:45:00"), "Möte #3", "Lite description"), 
            new CalendarEvent(new Date("2020-12-08 14:30:00"), new Date("2020-12-08 14:45:00"), "Möte #4", "Lite description"), 
            new CalendarEvent(new Date("2020-12-11 14:30:00"), new Date("2020-12-11 14:45:00"), "Möte #5", "Lite description"), 
            new CalendarEvent(new Date("2020-12-24 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #6", "Lite description"), 
            new CalendarEvent(new Date("2020-12-12 14:30:00"), new Date("2020-12-12 14:45:00"), "Utveckla kalender", "Lite description"), 
            new CalendarEvent(new Date("2020-12-12 17:30:00"), new Date("2020-12-12 18:00:00"), "Möte #2", "Lite description"),
            new CalendarEvent(new Date("2021-01-12 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #7", "Lite description"), 
        ];
    }

    setSelectedDate(newDate: Date) {
        runInAction(() => this.selectedDate = newDate);
    }

    hasEvents(date: Date) : boolean {
        const e = this.events.find(e => { 
            return e.start.getFullYear() === date.getFullYear() && 
                e.start.getMonth() === date.getMonth() && 
                e.start.getDate() === date.getDate();
        });
        if (e) return true; else return false;
    }

}
