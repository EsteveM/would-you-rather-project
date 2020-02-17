import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatQuestion, formatDate } from '../utils/helpers'

import { Card, Image, Row, Col, Button, Modal } from 'react-bootstrap'
import { Fragment } from 'react'

import { Redirect, withRouter } from 'react-router-dom'

class Question extends Component {
    handleClick = (e, id, answered) => {
        e.preventDefault()
        
        const { question } = this.props
        console.log('Question component - handleClick. question: ', question)
        console.log('Question component - handleClick. e: ', e)
        console.log('Question component - handleClick. id: ', id)
        console.log('Question component - handleClick. answered: ', answered)
        
        // EMG - Redirect to poll details
        this.props.history.push(`/questions/${id}`)
    }
    render () {
        console.log('Question component props: ', this.props)
        const { question, id, authedUser } = this.props
        const { answered } = question

        // EMG - Redirect to the login view if the authedUser has not been set
        if (!authedUser) {
            console.log('Question component - redirect to login')
            return <Redirect to='/login' />
        }

        // EMG - If the question does not exist, we warn about it
        if (question === null) {
            return (
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>This question does not exist.</p>
                    </Modal.Body>
                </Modal.Dialog>
            )
        }
        // EMG - Each question on the home page is rendered at this component, where it is also
        // allowed to link to its corresponding PollDetails.
        return (
            <Fragment>
                <Card border="primary">
                    <Card.Header>{question.name} asks:</Card.Header>
                    <Card.Body>
                        <Row>  
                            <Col>
                                <Image
                                    src={question.avatar}
                                    alt={`Avatar of ${question.name}`}
                                    className='avatar'
                                    fluid
                                    roundedCircle
                                />
                            </Col>  
                            <Col xs={10}>
                                <Card.Title>Would you rather</Card.Title>
                                <Card.Text>
                                    {question.text}
                                </Card.Text>
                                <Button variant="outline-success"
                                        onClick={(e) => this.handleClick(e, id, answered)}>
                                    View Poll
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{`Question created on ${formatDate(question.timestamp)}`}</small>
                    </Card.Footer>
                </Card>
                <br />
            </Fragment>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }, {id}) {
    const question = questions[id]
    
    return {
        authedUser,
        // EMG - Protection if the question does not exist. For example, if the user goes to some
        // random URL, and questions[id] does not exist. 
        question: question 
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

// EMG - Adding withRouter makes the Router props available to us
export default withRouter(connect(mapStateToProps)(Question))