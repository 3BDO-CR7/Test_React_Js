import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Details from './component/Details';
import signUp from './component/SignUp';
import myFav from './component/MyFav';
import AddAdv from './component/AddAdv';
import About from './component/About';
import TermsAdv from './component/TermsAdv';


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
                    <Route exact path='/About' component={About} />
                    <Route exact path='/myFav' component={myFav} />
                    <Route exact path='/TermsAdv' component={TermsAdv} />
                    <Route exact path='/AddAdv' component={AddAdv} />
                    <Route path='/login' component={Login} />
                    <Route path='/signUp' component={signUp} />
                    <Route path='/details' component={Details} />
                  </Switch>
            </Router>
        );
      }

}

export default App;

