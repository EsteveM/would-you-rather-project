import React, { Component, Fragment } from 'react'
// EMG - React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// EMG - React Bootstrap - Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Login'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import PollDetails from './PollDetails'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'

// EMG - We want to be able to show a loading bar so that the UI shows it while the initial
// data is loading
import LoadingBar from 'react-redux-loading'

class App extends Component {
  // EMG - When this component mounts, we want to dispatch the invokation of our 
  // handleInitialData action creator
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading, authedUser } = this.props

    console.log('App component props: ', this.props)

    // EMG - If the user is not authenticated, only the route to Login is declared. Otherwise, all
    // routes are
    if (!authedUser) {
      return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              {loading === true
                ? null
                : <Switch>
                    <Route path='/' component={Login} />
                  </Switch>
              }
            </div>
          </Fragment>
        </Router> 
      )
    } else {
      return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              {loading === true
                ? null
                : <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/questions/:id' exact component={PollDetails} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                    {/* Any route not specified above leads to the not found page */}
                    <Route component={NotFound} />
                  </Switch>
              }
            </div>
          </Fragment>
        </Router>
      )
    }
  }
}

// EMG - We ensure that the component is rendered only once the data from handleInitialData invokation
// is completed. 

function mapStateToProps({ users, questions, authedUser }) {
  return {
    // EMG - See the link below to test for an empty object
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    loading: (Object.entries(users).length === 0 && users.constructor === Object) ||
              (Object.entries(questions).length === 0 && questions.constructor === Object),
    authedUser,
  }
}

export default connect(mapStateToProps)(App)
