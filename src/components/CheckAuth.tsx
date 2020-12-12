// import React from 'react';
// import { useContext } from 'react';
import { observer } from 'mobx-react';
// import { RootStoreContext } from '../stores/RootStore';

export const CheckAuth = observer(({children}: any) => {
    // const auth = useContext(RootStoreContext).auth;

    // return auth.isAuthenticated() ? 
    //     (children) : 
    //     (
    //         <LoginForm/>
    //     );
    return (children);
});