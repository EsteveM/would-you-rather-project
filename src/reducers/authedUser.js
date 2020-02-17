import { SET_AUTHED_USER } from '../actions/authedUser'

// EMG - Definition of the questions reducer
export default function authedUser (state = null, action) {
    switch(action.type) {
        case SET_AUTHED_USER :
            return action.id
        default :
            return state
    }
}