// EMG - In order not to interact directly with _DATA.js file, we will go through this api.js file, 
// in a similar way as we did in the course lessons.
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer ({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer })
}