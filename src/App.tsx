import React from 'react';
import './semantic/semantic.min.css';
import './App.css';
import {
    MemoryRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { rootStore, RootStoreContext } from './stores/RootStore';
import { CheckAuth } from './components/CheckAuth';
import { ThemeBackground } from './components/ThemeBackground';
import { SettingsForm } from './components/SettingsForm';
import { AboutForm } from './components/AboutForm';
import { CalendarForm } from './components/CalendarForm';
import { EventForm } from './components/EventForm';

const App = () => {
    console.log('Starting Calendar!'); // tslint:disable-line
    return (
        <Router>
            <RootStoreContext.Provider value={rootStore}>
                <ThemeBackground>
                    <CheckAuth>
                        <Switch>
                            <Route exact path="/" component={CalendarForm} />
                            <Route path="/event/:eventId/:dateParam" component={EventForm} />
                            <Route path="/settings" component={SettingsForm} />
                            <Route path="/about" component={AboutForm} />
                        </Switch>
                    </CheckAuth>
                </ThemeBackground>
            </RootStoreContext.Provider>
        </Router>
    );
}

export default App;
