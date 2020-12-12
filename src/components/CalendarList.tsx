import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import moment from 'moment';
import { Grid } from 'semantic-ui-react';
import * as _ from 'lodash';

export const CalendarList = observer(() => {

    const { theme, calendar } = useStores();

    const events = calendar.getEvents().map((e, i) => {
        return (
            <Grid.Row key={i} className="calendar-list-item">
                <Grid.Column width="4">
                    {moment(e.start).format("HH:mm")}
                </Grid.Column>
                <Grid.Column width="12">
                    {e.title}
                </Grid.Column>
            </Grid.Row>
        );
    });

    return (
        <Grid columns="equal" celled>
            {events}
        </Grid>
    );
});