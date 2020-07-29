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
import SelectCategory from './component/SelectCategory';
import SelectSubCategory from './component/SelectSubCategory';
import ForgetPassword from './component/ForgetPassword';
import NewPassword from './component/NewPassword';
import ActiveAccount from './component/ActiveAccount';


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
                    <Route path='/login' component={Login} />
                    <Route path='/signUp' component={signUp} />
                    <Route path='/ForgetPassword' component={ForgetPassword} />
                    <Route path='/NewPassword' component={NewPassword} />
                    <Route path='/ActiveAccount' component={ActiveAccount} />
                    <Route exact path='/About' component={About} />
                    <Route exact path='/myFav' component={myFav} />
                    <Route exact path='/SelectCategory' component={SelectCategory} />
                    <Route exact path='/SelectSubCategory' component={SelectSubCategory} />
                    <Route exact path='/TermsAdv' component={TermsAdv} />
                    <Route exact path='/AddAdv' component={AddAdv} />
                    <Route path='/details' component={Details} />
                  </Switch>
            </Router>
        );
      }

}

export default App;

