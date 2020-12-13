import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { SimpleNavBar } from './SimpleNavBar';
import { fullscreenBelowMenuStyle } from './CustomStyles';
import { useParams } from 'react-router-dom';

export const EventForm = observer(() => {
    const { theme } = useStores();
    const { eventId } = useParams<{eventId: string}>();
    const { dateParam } = useParams<{dateParam: string}>();

    const newEvent = eventId === "new";

    const title = newEvent ? "Add new event" : "Edit event";

    return (
        <div className="container">
            <SimpleNavBar title={title} />
            <div className="ui grid" style={fullscreenBelowMenuStyle}>
                <div className="row" style={theme.blogText()}>
                    <div className="sixteen wide column">
                        <p>{`New event: ${newEvent}, date: ${dateParam}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});