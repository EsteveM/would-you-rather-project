// EMG - We use this function to format timestamps, which was used in the lessons
export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

// EMG - This is a helper function to format questions in an enriched way throughout the application
export function formatQuestion (question, user, authedUser) {
  const { optionOne, optionTwo, timestamp, id } = question
  const { name, avatarURL } = user

  return {
    id,
    name,
    avatar: avatarURL,
    optionOneText: optionOne.text,
    optionTwoText: optionTwo.text,
    optionOneEditedText: `Would you rather ${optionOne.text}?`,
    optionTwoEditedText: `Would you rather ${optionTwo.text}?`,
    text: `${optionOne.text} or ${optionTwo.text}?`,
    timestamp,
    answered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
              ? true
              : false,
    optionOneVotes: optionOne.votes.length,
    optionTwoVotes: optionTwo.votes.length,
    totalVotes: optionOne.votes.length + optionTwo.votes.length,
    yourVoteOptionOne: optionOne.votes.includes(authedUser),
    yourVoteOptionTwo: optionTwo.votes.includes(authedUser),
    optionOnePercentage: optionOne.votes.length + optionTwo.votes.length > 0
    ? Math.round((optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length))*100)
    : 0,
    optionTwoPercentage: optionOne.votes.length + optionTwo.votes.length > 0
    ? Math.round((optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length))*100)
    : 0,
    cheating: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
                ? true
                : false,
  }
}

// EMG - This is a helper function to format users conveniently regarding the leaderboard
export function formatUser (user) {
  const { id, name, avatarURL, answers, questions } = user

  return {
    id,
    name,
    avatarURL,
    answers,
    questions,
    answeredQuestions: Object.keys(answers).length,
    createdQuestions: questions.length,
    score: Object.keys(answers).length + questions.length,
  }
}