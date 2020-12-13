import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { SimpleNavBar } from './SimpleNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import { useParams } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';

export const EventForm = observer(() => {
    const { theme } = useStores();
    const { eventId } = useParams<{eventId: string}>();
    const { dateParam } = useParams<{dateParam: string}>();

    const newEvent = eventId === "new";

    const title = newEvent ? "Add new event" : "Edit event";

    return (
        <div className="container">
            <SimpleNavBar title={title} hasSaveButton />
            <div className="ui grid" style={ {...theme.blogText(), ...fullscreenBelowMenuStyle } }>
                <div className="row" >
                    <div className="sixteen wide column" >
                        <p>{`New event: ${newEvent}, date: ${dateParam}`}</p>
                    </div>

                    {/* Title input */}
                    <div className="sixteen wide column" >
                        <div className="ui fluid icon input">
                            <input style={theme.input()} type="text" placeholder="Add title"/>
                        </div>
                    </div>

                    {/* All day toggle */}
                    <div className="sixteen wide column" >
                        <Checkbox toggle /><label style={theme.settingsHeader()}>All day event</label>
                    </div>

                    {/* TODO: date/time picker */}
                </div>
            </div>
        </div>
    );
});