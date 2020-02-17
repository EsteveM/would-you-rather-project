import { getInitialData } from '../utils/api'
// EMG - We import the action creators
import { receiveUsers, saveAnswerOnUser, addQuestionOnUser } from '../actions/users'
import { receiveQuestions, saveAnswer, addQuestion } from '../actions/questions'

import { saveQuestionAnswer, saveQuestion } from '../utils/api'

// EMG - We want to be able to show a loading bar so that the UI shows it while the initial
// data is loading
import { showLoading, hideLoading } from 'react-redux-loading'

// EMG - This function uses the redux-thunk pattern because we want to make an asynchronous request
export function handleInitialData () {
    return (dispatch) => {
        // EMG - dispatching of showLoading will allow us to show the Loading Bar
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                // EMG - dispatching of hideLoading will allow us to hide the Loading Bar
                dispatch(hideLoading())
            })
    }
}

// EMG - This asynchronous action creator is responsible for dispatching saveAnswer as well as
// saving the information to the database by calling saveQuestionAnswer
export function handleSaveAnswer (info) {
    return (dispatch) => {

        dispatch(showLoading())

        return saveQuestionAnswer(info)
            .then(() => { 
                dispatch(saveAnswer(info))
                dispatch(saveAnswerOnUser(info))
            })
            .then(hideLoading())
            .catch((e) => {
                console.warn('Error in handleSaveAnswer: ', e)
                alert('There was an error saving the answer. Please, try again.')
            })
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {    
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const info = {
            author: authedUser,
            optionOneText,
            optionTwoText,
        }
        console.log ('shared.js reducers - handleAddQuestion - info', info)

        return saveQuestion(info)
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionOnUser(question.author, question.id))
            })
            .then(hideLoading())
            .catch((e) => {
                console.warn('Error in handleSaveQuestion: ', e)
                alert('There was an error saving the question. Please, try again.')
            })
    }
}