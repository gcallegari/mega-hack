import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import IdeasMap from './pages/IdeasMap';
import Idea from './pages/Idea';
import CreateIdea from './pages/CreateIdea';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={IdeasMap} />


                <Route path="/ideas/create" component={CreateIdea} />
                <Route path="/ideas/:id" component={Idea} />


            </Switch>
        </BrowserRouter>
    );
}

export default Routes;