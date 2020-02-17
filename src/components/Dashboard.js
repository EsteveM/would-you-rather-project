import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'
import Nav from './Nav'

import { Redirect } from 'react-router-dom'

import { Container, Jumbotron, Tabs, Tab } from 'react-bootstrap'

class Dashboard extends Component {
    state = {
        key: 'unanswered-questions',
    }
    setKey = (key) => {

        console.log('Dashboard component - setKey called. Value of key is: ', key)
        this.setState(() => ({
            key
        }))
    }
    render() {
        console.log('Dashboard component state: ', this.state)
        console.log('Dashboard component props: ', this.props)
        const { key } = this.state
        const { authedUserAnswers, questions, authedUser } = this.props
        
        const answeredQuestionIds = Object.keys(Object(authedUserAnswers))
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        console.log('Dashboard component - answeredQuestionIds: ', answeredQuestionIds)
        
        const unansweredQuestionIds = Object.keys(questions)
                .filter((key) => !answeredQuestionIds.includes(key))
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        console.log('Dashboard component - unansweredQuestionIds: ', unansweredQuestionIds)
        
        // EMG - Redirect to the login view if the authedUser has not been set
        if (!authedUser) {
            console.log('Dashboard component - redirect to login')
            return <Redirect to='/login' />
        }
        // EMG - The user is shown all question polls classified into two groups, those that they 
        // have answered, and those that they have not. They can toggle between both groups, 
        // and the unanswered ones are shown by default. Within each group, question polls are sorted
        // by their creation date, from more recent (top) to least recent (bottom).
        return (
            <div>
                <Nav />
                <Container className="p-3">
                    <Jumbotron className='center'>
                        <Tabs id="controlled-tab" activeKey={key} onSelect={k => this.setKey(k)}>
                            <Tab eventKey="unanswered-questions" title="Unanswered Questions">
                                {unansweredQuestionIds.map((id) => (
                                    <Question id={id} key={id} />
                                ))} 
                            </Tab>
                            <Tab eventKey="answered-questions" title="Answered Questions">
                                {answeredQuestionIds.map((id) => (
                                    <Question id={id} key={id} />
                                ))}
                            </Tab>
                        </Tabs>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {
    return {
        authedUserAnswers: Object(Object.values(users)
            .filter((value) => value.id === authedUser)[0]).answers,
        questions,
        authedUser,
    }
}

export default connect(mapStateToProps)(Dashboard)