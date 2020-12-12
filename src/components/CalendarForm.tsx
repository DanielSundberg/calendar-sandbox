import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { SimpleNavBar } from './SimpleNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import moment from 'moment';
import { Grid } from 'semantic-ui-react';

export const CalendarForm = observer(() => {

    const getWeekRange = (week: number) => {
        var weekStart = moment().add(week, 'weeks').startOf('week');
        
        return [...Array(7)].map((_, i) => {
            const day = weekStart.clone().add(i, 'day');
            const dayClass = moment().dayOfYear() === day.dayOfYear() ? "week-day calendar-today" : "week-day";

            return (
                <Grid.Column width="2" key={`${week}-${i}`} className={dayClass}>
                    {day.format('D')}
                </Grid.Column>
            );
        });
    }

    const { theme } = useStores();

    console.log("Moment locale: ", moment.locale());

    moment.updateLocale('en', { week: { dow : 1, } });

    const weekdayshortname = moment.weekdaysShort(true).map(day => {
        return (
          <Grid.Column width="2" key={day} className="week-header">
            {day}
          </Grid.Column>
        );
     });

    const today = moment();
    const currentWeek = today.week();
    console.log(today.add(2, 'weeks').week());

    const weekRows = [0,1,2,3,4,5].map((_, i) => 
        <Grid.Row>
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