import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores/RootStore';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { dropdownMenuFullWidth } from './CustomStyles';

export const CalendarNavBar = observer((props: {title: string}) => {
    const { theme, calendar } = useStores();
    const history = useHistory();

    const hamburger = (
        <Dropdown 
            item={true} 
            icon='bars' 
            style={theme.softMenu()}
        >
            <Dropdown.Menu style={ { ...theme.dropDownMenuBackground(), ...dropdownMenuFullWidth } }>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => history.push("/settings")}>
                    <div style={theme.dropdownMenu()}>
                        <Icon name="cogs" style={theme.dropdownMenu()}/>
                        <span className='text' style={theme.dropdownMenu()}>Settings...</span>
                    </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => history.push("/about")}>
                    <div style={theme.dropdownMenu()}>
                        <Icon name="info circle" style={theme.dropdownMenu()}/>
                        <span className='text' style={theme.dropdownMenu()}>About...</span>
                    </div>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    // tsline:disable-next-line
    return (
        <Menu inverted attached>
            {hamburger}
            <Menu.Item header className="borderless item left" style={theme.softMenu()}>
                {props.title}
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item style={theme.softMenu()} as={Link} to={`/event/new/${calendar.selectedDate}`}>
                    <Icon name="plus" />
                </Menu.Item>
                <Menu.Item style={theme.softMenu()} onClick={() => calendar.home()}>
                    <Icon name="home" />
                </Menu.Item>
                <Menu.Item style={theme.softMenu()} onClick={() => calendar.prevPage()}>
                    <Icon name="arrow left" />
                </Menu.Item>
                <Menu.Item style={theme.softMenu()} onClick={() => calendar.nextPage()}>
                    <Icon name="arrow right" />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
});