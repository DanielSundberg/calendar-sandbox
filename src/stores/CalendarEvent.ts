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
    }
}