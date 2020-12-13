import { Storage as storage } from '../utils/Storage';
import { makeObservable, observable, action, runInAction, reaction } from 'mobx';
import { CalendarEvent } from './CalendarEvent';
import moment from 'moment';

export class CalendarStore {
    selectedDate: Date = new Date(moment().format('yyyy-MM-DD'));
    viewStart: Date = new Date(moment().format('yyyy-MM-DD'));
    page: number = 0;
    events: CalendarEvent[];

    constructor() {
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
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #8", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #9", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #10", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #11", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #12", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #13", "Lite description"), 
            new CalendarEvent(new Date("2020-12-13 14:30:00"), new Date("2020-12-24 14:45:00"), "Möte #14", "Lite description"), 
        ];

        makeObservable(this, {
            selectedDate: observable, 
            viewStart: observable, 
            events: observable
        });
    }

    setSelectedDate(newDate: Date) {
        runInAction(() => this.selectedDate = new Date(newDate));
        console.log("New selected date is: ", this.selectedDate);
    }

    hasEvents(date: Date) : boolean {
        const e = this.events.find(e => { 
            return e.start.getFullYear() === date.getFullYear() && 
                e.start.getMonth() === date.getMonth() && 
                e.start.getDate() === date.getDate();
        });
        if (e) return true; else return false;
    }

    getEvents() : CalendarEvent[] {
        let events = this.events.filter(e => { 
            return e.start.getFullYear() === this.selectedDate.getFullYear() && 
                e.start.getMonth() === this.selectedDate.getMonth() && 
                e.start.getDate() === this.selectedDate.getDate();
        });
        return events;
    }

    getDisplayHeader(): string {
        return `${moment(this.selectedDate).format('MMMM yyyy')}`;
    }

    nextPage() {
        runInAction(() => {
            const nextMonth = moment(this.viewStart).add(1, 'month');
            const firstDateOfNextMonth = moment([nextMonth.year(), nextMonth.month()]).format('yyyy-MM-DD');
            this.viewStart = new Date(firstDateOfNextMonth);
            this.selectedDate = this.viewStart;
        });
    }

    prevPage() {
        runInAction(() => {
            const prevMonth = moment(this.viewStart).subtract(1, 'month');
            const firstDateOfPrevMonth = moment([prevMonth.year(), prevMonth.month()]).format('yyyy-MM-DD');
            this.viewStart = new Date(firstDateOfPrevMonth);
            this.selectedDate = this.viewStart;
        });
    }

    home() {
        runInAction(() => {
            this.selectedDate = new Date(moment().format('yyyy-MM-DD'));
            this.viewStart = new Date(moment().format('yyyy-MM-DD'));
        });
    }
}
