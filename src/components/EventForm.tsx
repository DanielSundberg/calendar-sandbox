import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { SimpleNavBar } from './SimpleNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import { useParams } from 'react-router-dom';
import { Button, Checkbox } from 'semantic-ui-react';
import moment from 'moment';

export const EventForm = observer(() => {
    const { theme, calendar } = useStores();
    const { eventId } = useParams<{eventId: string}>();
    const { dateParam } = useParams<{dateParam: string}>();

    const newEvent = eventId === "new";

    const title = newEvent ? "Add new event" : "Edit event";

    const defaultMeetingTime = moment().add(1, 'hour').startOf('hour');

    return (
        <div className="container">
            <SimpleNavBar title={title} hasSaveButton />
            <div className="ui grid" style={ {...theme.blogText(), ...fullscreenBelowMenuStyle } }>
                <div className="row" >
                    <div className="sixteen wide column" >
                        <p>{`New event: ${newEvent}, date: ${dateParam}`}</p>
                    </div>
                </div>

                {/* Title input */}
                <div className="row" >
                    <div className="sixteen wide column" >
                        <div className="ui fluid icon input">
                            <input style={theme.input()} type="text" placeholder="Add title"/>
                        </div>
                    </div>
                </div>

                {/* All day toggle */}
                <div className="row" >
                    <div className="sixteen wide column" >
                        <Checkbox toggle /><label style={theme.settingsHeader()}>All day event</label>
                    </div>
                </div>

                {/* TODO: date/time picker */}
                <div className="row" >
                    <div className="eight wide column" >
                        <Button fluid>{moment(calendar.selectedDate).format('yyyy-MM-DD')}</Button>
                    </div>
                    <div className="eight wide column" >
                        <Button fluid>{moment(calendar.selectedDate).format('HH:mm')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});