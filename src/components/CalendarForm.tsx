import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { CalendarNavBar } from './CalendarNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import moment from 'moment';
import { Grid, Segment, SegmentGroup } from 'semantic-ui-react';
import * as _ from 'lodash';
import { CalendarView } from './CalendarView';
import { CalendarList } from './CalendarList';

export const CalendarForm = observer(() => {

    const { theme, calendar } = useStores();

    return (
        <div className="container">
            <CalendarNavBar title={calendar.getDisplayHeader()} />
            <div className="ui eight column grid" style={fullscreenBelowMenuStyle}>
                <div className="row" style={theme.blogText()}>
                    <div className="sixteen wide column">
                        <div className="ui sticky">
                            <CalendarView />
                        </div>
                        <div className="ui">
                            <CalendarList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});