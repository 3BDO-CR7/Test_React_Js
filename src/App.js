import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Details from './component/Details';
import signUp from './component/SignUp';
import myFav from './component/MyFav';


class App extends Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }

      render() {
        return (
            <Router>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/myFav' component={myFav} />
                    <Route path='/login' component={Login} />
                    <Route path='/signUp' component={signUp} />
                    <Route path='/details' component={Details} />
                  </Switch>
            </Router>
        );
      }

}

export default App;

