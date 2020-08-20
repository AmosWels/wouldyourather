import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleFetch } from '../actions/';
import { connect } from 'react-redux';
import Login from './login';
import Dashboard from './dashboard';
import NewPoll from '../components/commons/newPoll';
import Leaderboard from '../components/dashboard/leaderboard';
import PollAnswer from '../components/dashboard/pollAnswer'
import MenuAppBar from './commons/nav';
import InvalidUrl from './commons/broken'

class App extends Component {
    componentDidMount() {
        this.props.handleFetch();
    }
  render() {
    const { authUser } = this.props;
    return (
    <Router>
        {/* <MenuAppBar /> */}
      {authUser === null ? (
            <Route
              render={() => (
                  <Login />
              )}
            /> ) : (
        <Fragment>
        <MenuAppBar />
        <Switch>
            <Route exact path='/' component={Dashboard}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
            <Route exact path='/add' component={NewPoll}></Route>
            <Route exact path='/leaderboard' component={Leaderboard}></Route>
            <Route exact path="/questions/:question_id/:button?" component={PollAnswer} />
            <Route exact path='/questions/invalid' component={InvalidUrl} />
            {/* <Route component={InvalidUrl} /> */}
        </Switch>
        </Fragment>
         )}
    </Router>
    );
  }
}

function mapStateToProps({ authUser }) {
    return {
      authUser
    };
  }

export default connect(
    mapStateToProps,
    { handleFetch }
  )(App);