// EMG - Here we have the action type
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_ON_USER = 'SAVE_ANSWER_ON_USER'
export const ADD_QUESTION_ON_USER = 'ADD_QUESTION_ON_USER'

// EMG - Here we have our receiveUsers action creator
export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function saveAnswerOnUser ({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER_ON_USER,
        authedUser,
        qid,
        answer,
    }
}

export function addQuestionOnUser (authedUser, qid) {
    return {
        type: ADD_QUESTION_ON_USER,
        authedUser,
        qid,
    }
}