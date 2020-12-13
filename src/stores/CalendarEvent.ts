import { makeObservable, observable } from "mobx";
import moment from "moment";

export class CalendarEvent {
    start: Date;
    end: Date;
    allDay: boolean = false;
    calendar: string = "";
    title: string;
    description: string;
    timezone: string = "";
    recurrance: string = "";
    notifications: Date[] = []
    
    constructor(start: Date, end: Date, title: string, description: string) {
        this.start = start;
        this.end = end;
        this.title = title;
        this.description = description;

        makeObservable(this, {
            start: observable, 
            title: observable
        });
    }

    moveForwardOneDay() {
        const newStart = moment(this.start).add(1, 'day');
        this.start = new Date(newStart.format());
    }

    moveForwardOneWeek() {
        const newStart = moment(this.start).add(7, 'day');
        this.start = new Date(newStart.format());
    }
}