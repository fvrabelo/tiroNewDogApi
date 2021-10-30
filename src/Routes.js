import React from 'react'
import {Switch, Route} from 'react-router-dom'
import  Home from './pages/Home'
import  Config from './pages/config'


export default function(){
    return(
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/config">
                <Config />
            </Route>

        </Switch>
    )
}