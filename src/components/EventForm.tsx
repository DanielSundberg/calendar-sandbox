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

    console.log(`New event: ${newEvent}, date: ${dateParam}`);

    return (
        <div className="container">
            {/* <SimpleNavBar title="About AARR v2.1" /> */}
            <div className="ui grid" style={fullscreenBelowMenuStyle}>
                <div className="row" style={theme.blogText()}>
                    <div className="sixteen wide column">
                        <p>This is an RSS reader for <a href="http://theoldreader.com/">The Old Reader</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
});