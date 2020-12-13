import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import moment from 'moment';
import 'moment/locale/sv';
import { Grid } from 'semantic-ui-react';
import * as _ from 'lodash';
import { useLongPress } from './UseLongPress';
import { useHistory } from 'react-router-dom';

export const CalendarView = observer(() => {

    const { theme, calendar } = useStores();
    const history = useHistory();

    const longPressProps = useLongPress({
        onClick: (e) => calendar.setSelectedDate(e.target.attributes["data-key"].value),
        onLongPress: (e) => {
            calendar.setSelectedDate(e.target.attributes["data-key"].value);
            history.push(`/event/new/${moment(calendar.selectedDate).format('yyyy-MM-DD')}`);
        },
        ms: 300
    });

    const getWeekRange = (week: number) => {
        var weekStart = moment(calendar.viewStart).add(week, 'weeks').startOf('week');

        return [...Array(7)].map((x, i) => {
            const day = weekStart.clone().add(i, 'day');
            const today = moment();
            
            // console.log(`${day.month()}-${today.month()}`)
            // Months outside "main month in view" should have other color
            let dayClass = day.month() === moment(calendar.viewStart).month() ? "calendar-day" : "calendar-other-month";

            if (moment(calendar.selectedDate).isSame(day, 'day')) {
                dayClass = " calendar-selected"
            } else if (moment(today).isSame(day, 'day')) {
                dayClass = " calendar-today"
            }

            const hasEvents = calendar.hasEvents(new Date(day.format('yyyy-MM-DD')));
            if (hasEvents) {
                dayClass += " calendar-has-event"
            }
            // console.log(hasEvents);

            return (
                <Grid.Column 
                    width="2" 
                    key={`${week}-${i}`} 
                    className={dayClass} 
                    data-key={day.format('yyyy-MM-DD')}
                    // onClick={(e: any) => calendar.setSelectedDate(e.target.attributes["data-key"].value)}
                    {...longPressProps}
                >
                    {day.format('D')}
                </Grid.Column>
            );
        });
    }

    // moment.updateLocale('en', { week: { dow : 1, } });
    // moment.locale('sv');

    const weekdayshortname = moment.weekdaysShort(true).map(day => {
        return (
          <Grid.Column width="2" key={day} className="week-header">
            {day}
          </Grid.Column>
        );
     });

    // console.log("View start: ", calendar.viewStart);

    const weekRows = [0,1,2,3,4,5].map((_, i) => 
        <Grid.Row key={i}>
            <Grid.Column width="2" style={{fontSize: "x-small"}}>
                {moment(calendar.viewStart).add(i, 'weeks').week()}
            </Grid.Column>
            {getWeekRange(i)}
        </Grid.Row>
    );

    return (
        <Grid columns="equal" celled='internally'>
            <Grid.Row>
                <Grid.Column width="2" />
                {weekdayshortname}
            </Grid.Row>
            {weekRows}
        </Grid>
    );
});