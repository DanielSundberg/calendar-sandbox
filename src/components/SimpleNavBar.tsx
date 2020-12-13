import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

export const SimpleNavBar = observer((props: {title: string, hasSaveButton?: boolean }) => {
    const { theme, calendar } = useStores();
    const history = useHistory();

    const saveButton = props.hasSaveButton && (
        <Menu.Menu position="right">
            <Menu.Item style={theme.softMenu()} onClick={() => console.log("Save event...")}>
                <Icon name="save" /><b>Save</b>
            </Menu.Item>
        </Menu.Menu>
    )

    // tsline:disable-next-line
    return (
        <Menu inverted attached>
            <Menu.Item
                name='back'
                active={false}
                onClick={() => history.goBack()}
                style={theme.headerText()}
            >
                <Icon name="arrow left" />
            </Menu.Item>
            <Menu.Item header className="borderless item left" style={theme.softMenu()}>
                {props.title}
            </Menu.Item>
            {saveButton}
        </Menu>
    );
});