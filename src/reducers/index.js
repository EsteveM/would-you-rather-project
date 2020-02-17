import { combineReducers } from 'redux'
// EMG - We import all reducers that we have made
import authedUser from './authedUser'
import users from './users'
import questions from './questions'

// EMG - We want to be able to show a loading bar so that the UI shows it while the initial
// data is loading
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})