// EMG - Here we have the action type
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

// EMG - Here we have our setAuthedUser action creator
export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}