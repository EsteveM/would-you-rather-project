// EMG - Here we have the action types
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

// EMG - Here we have our receiveQuestions action creator
export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveAnswer ({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

