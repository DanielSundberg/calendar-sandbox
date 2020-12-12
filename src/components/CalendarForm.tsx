import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { SimpleNavBar } from './SimpleNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import moment from 'moment';
import { Grid } from 'semantic-ui-react';
import * as _ from 'lodash';

export const CalendarForm = observer(() => {

    const { theme, calendar } = useStores();

    const getWeekRange = (week: number) => {
        var weekStart = moment().add(week, 'weeks').startOf('week');

        return [...Array(7)].map((x, i) => {
            const day = weekStart.clone().add(i, 'day');
            const today = moment();
            let dayClass = "calendar-day";
            if (moment(calendar.selectedDate).isSame(day, 'day')) {
                dayClass += " calendar-selected"
            } else if (moment(today).isSame(day, 'day')) {
                dayClass += " calendar-today"
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
                    onClick={(e: any) => calendar.setSelectedDate(e.target.attributes["data-key"].value)}
                >
                    {day.format('D')}
                </Grid.Column>
            );
        });
    }

    // console.log("Moment locale: ", moment.locale());

    moment.updateLocale('en', { week: { dow : 1, } });

    const weekdayshortname = moment.weekdaysShort(true).map(day => {
        return (
          <Grid.Column width="2" key={day} className="week-header">
            {day}
          </Grid.Column>
        );
     });

    // const today = moment();
    // console.log("Today: ", today);

    const weekRows = [0,1,2,3,4,5].map((_, i) => 
        <Grid.Row key={i}>
            <Grid.Column width="2" style={{fontSize: "x-small"}}>{moment().add(i, 'weeks').week()}</Grid.Column>
            {getWeekRange(i)}
        </Grid.Row>
    );

    return (
        <div className="container">
            <SimpleNavBar title="Calendar sandbox" />
            <div className="ui eight column grid" style={fullscreenBelowMenuStyle}>
                <div className="row" style={theme.blogText()}>
                    <div className="sixteen wide column">
                        <Grid columns="equal" celled='internally'>
                            <Grid.Row>
                                <Grid.Column width="2" />
                                {weekdayshortname}
                            </Grid.Row>
                            {weekRows}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
});