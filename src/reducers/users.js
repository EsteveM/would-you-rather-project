import { RECEIVE_USERS, SAVE_ANSWER_ON_USER, ADD_QUESTION_ON_USER } from '../actions/users'

// EMG - Definition of the users reducer
export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER_ON_USER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_QUESTION_ON_USER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            }
        default :
            return state
    }
}