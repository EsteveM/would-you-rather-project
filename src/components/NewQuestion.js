// EMG - This component is going to handle the UI for creating a new question
import React, { Component } from 'react'
// EMG - We need access to dispatch
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'

import { Redirect } from 'react-router-dom'

import Nav from './Nav'

import { Container, Jumbotron, Form, Button } from 'react-bootstrap'

class NewQuestion extends Component {
    // EMG - We store text in this component's state and not in the Redux store because
    // it is going to be used in this component only
    state = {
        optionOne: '',
        optionTwo: '',
        toDashboard: false,
    }
    onChangeOptionOne = (optionOne) => {
        
        console.log ('NewQuestion component - onChangeOptionOne - optionOne', optionOne)
        this.setState(() => ({
            optionOne
        }))
    }
    onChangeOptionTwo = (optionTwo) => {
        
        console.log ('NewQuestion component - onChangeOptionTwo - optionTwo', optionTwo)
        this.setState(() => ({
            optionTwo
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        console.log ('NewQuestion component - handleSubmit - optionOne', optionOne)
        console.log ('NewQuestion component - handleSubmit - optionTwo', optionTwo)

        if (optionOne === '' || optionTwo === '') {
            console.warn(`NewQuestion - hanleSubmit - Both options must be filled out in order to submit.`)
            alert('Please, fill out both options in order to submit your new poll question.')
        } else {
            // EMG - Add question to the store
            dispatch(handleAddQuestion(optionOne, optionTwo))

            // EMG - We reset optionOne and optionTwo texts to an empty string
            this.setState(() => ({
                optionOne: '',
                optionTwo: '',
                toDashboard: true,
            }))
        }
    }
    render() {
        console.log('NewQuestion component state: ', this.state)
        console.log('NewQuestion component props: ', this.props)
        const { optionOne, optionTwo, toDashboard } = this.state
        const { authedUser } = this.props

        // EMG - Redirect to the home view if new question submitted
        if (toDashboard === true) {
            console.log('NewQuestion component - redirect to home view')
            return <Redirect to='/' />
        }

        // EMG - Redirect to the login view if the authedUser has not been set
        if (!authedUser) {
            console.log('NewQuestion component - redirect to login')
            return <Redirect to='/login' />
        }

        const optionOneLeft = 100 - optionOne.length
        const optionTwoLeft = 100 - optionTwo.length

        return (
            <div>
                <Nav />
                <Container className="p-3">
                    <Jumbotron className='center'>
                        <h1>Create New Question</h1>
                        <h2>Complete the question:</h2>
                        <h3>Would you rather ...</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formOptionOne">
                                <hr></hr>
                                <Form.Label>Option One</Form.Label>
                                <Form.Control type="text" value={optionOne} maxLength={100} placeholder="Enter option one" onChange={(event) => this.onChangeOptionOne(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    This is the first option of your poll question.
                                    {/* EMG - We warn the user when there are less than or equal to 25
                                    characters left to reach the maximum text length */}
                                    {optionOneLeft <= 25 && (
                                        <div className="option-one-lengh" style={{ color: 'red' }}>
                                            {`${optionOneLeft} characters left`}
                                        </div>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <hr></hr>
                            OR
                            <hr></hr>
                            <Form.Group controlId="formOptionTwo">
                                <Form.Label>Option Two</Form.Label>
                                <Form.Control type="text" value={optionTwo} maxLength={100} placeholder="Enter option two" onChange={(event) => this.onChangeOptionTwo(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    This is the second option of your poll question.
                                    {/* EMG - We warn the user when there are less than or equal to 25
                                    characters left to reach the maximum text length */}
                                    {optionTwoLeft <= 25 && (
                                        <div className="option-two-lengh" style={{ color: 'red' }}>
                                            {`${optionTwoLeft} characters left`}
                                        </div>
                                    )}
                                </Form.Text>
                                <hr></hr>
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit"
                                // EMG - The button is disabled if no text has been input in either
                                // of the options
                                disabled={optionOne === '' || optionTwo === ''}>
                                    Submit
                            </Button>
                        </Form>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)