import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatQuestion, formatDate } from '../utils/helpers'

import { Redirect } from 'react-router-dom'

import Nav from './Nav'

import { Container, Jumbotron, ProgressBar, Card, Image, Row, Col, Button, Badge, ButtonGroup, Form } from 'react-bootstrap'
import { Fragment } from 'react'

import { handleSaveAnswer } from '../actions/shared'

class PollDetails extends Component {
    state = {
        option: '',
    }
    onChangePollDetails = (option) => {        
        console.log('PollDetails component - onChangePollDetails. New value for option: ', option)
        this.setState(() => ({
            option
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { option } = this.state
        const { dispatch, authedUser, question } = this.props
        const { id, cheating } = question
        console.log('PollDetails component - handleSubmit. Dispatch option: ', option)
        console.log('PollDetails component - handleSubmit. props: ', this.props)
        console.log('PollDetails component - handleSubmit. id: ', id)
        console.log('PollDetails component - handleSubmit. question: ', question)
        // EMG - The authedUser should not vote if they have already voted for this question
        if (cheating) {
            console.warn(`PollDetails - hanleSubmit - Double voting attempted by ${authedUser}.`)
            alert('You have already voted for this question. Double voting is not allowed.')
        } else {
            // EMG - handle Submit to save information in the Redux Store
            dispatch(handleSaveAnswer({
                authedUser,
                qid: id,
                answer: option,
            }))

            // EMG - Redirect to poll details
            this.props.history.push(`/questions/${id}`)


            // EMG - We reset the option to an empty string
            this.setState(() => ({
                option: ''
            }))
        }
    }
    render () {
        console.log('PollDetails component props: ', this.props)
        console.log('PollDetails component state: ', this.state)
        const { authedUser, question } = this.props
        const { option } = this.state

        // EMG - Redirect to the login view if the authedUser is has not been set
        if (!authedUser) {
            console.log('PollDetails component - redirect to login')
            return <Redirect to='/login' />
        }

        // EMG - Redirect to page not found if the question does not exist
        if (question === null) {
            console.log('PollDetails component - redirect to notfound')
            return <Redirect to='/notfound' />
        }

        const { name, avatar, optionOneText, optionTwoText, optionOneEditedText, 
            optionTwoEditedText, optionOnePercentage, 
            optionTwoPercentage, optionOneVotes, optionTwoVotes, totalVotes, 
            yourVoteOptionOne, yourVoteOptionTwo, answered, timestamp} = question
        // EMG - When the user clicks on the "VIEW POLL" button within one of the unanswered questions
        // in the home page, its details are shown at `questions/:question_id`. All of the "Would you
        // rather" text, both options, and owner avatar are shown.
        // EMG - When the user clicks on the "VIEW POLL" button within one of the answered questions
        // in the home page, its details are shown at `questions/:question_id`. For each option, all
        // of the text of the option, and percentage and number of people that voted for it are shown. 
        // Furthermore, the option voted by the user that is logged in is clearly identified.
        return (
            <div>
                <Nav />
                <Container className="p-3">
                    <Jumbotron className='center'>
                        <Fragment>
                            {answered && (
                                <Card border="primary">
                                    <Card.Header>Asked by {name}:</Card.Header>
                                    <Card.Body>
                                        <Row>  
                                            <Col>
                                                <Image
                                                    src={avatar}
                                                    alt={`Avatar of ${name}`}
                                                    className='avatar'
                                                    fluid
                                                    roundedCircle
                                                />
                                            </Col>  
                                            <Col xs={10}>
                                                <Card.Title>Results:</Card.Title>
                                                <ButtonGroup>
                                                    <Button variant="outline-success" disabled>
                                                        {yourVoteOptionOne && (
                                                            <Badge pill variant="warning">Your Vote</Badge>
                                                        )}
                                                        <Card.Text>
                                                            {optionOneEditedText}
                                                        </Card.Text>
                                                        <ProgressBar now={optionOnePercentage} 
                                                                    label={`${optionOnePercentage}%`} />
                                                        <Card.Text>
                                                            {`${optionOneVotes} out of ${totalVotes} votes`}
                                                        </Card.Text>
                                                    </Button>
                                                    <Button variant="outline-success" disabled>
                                                        {yourVoteOptionTwo && (
                                                            <Badge pill variant="warning">Your Vote</Badge>
                                                        )}
                                                        <Card.Text>
                                                            {optionTwoEditedText}
                                                        </Card.Text>
                                                        <ProgressBar now={optionTwoPercentage} 
                                                                    label={`${optionTwoPercentage}%`} />
                                                        <Card.Text>
                                                            {`${optionTwoVotes} out of ${totalVotes} votes`}
                                                        </Card.Text>
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{`Question created on ${formatDate(timestamp)}`}</small>
                                    </Card.Footer>     
                                </Card>
                            )}
                            {!answered && (
                                <Card border="primary">
                                    <Card.Header>{name} asks</Card.Header>
                                    <Card.Body>
                                        <Row>  
                                            <Col>
                                                <Image
                                                    src={avatar}
                                                    alt={`Avatar of ${name}`}
                                                    className='avatar'
                                                    fluid
                                                    roundedCircle
                                                />
                                            </Col>  
                                            <Col xs={10}>
                                                <Card.Title>Would you rather</Card.Title>
                                                <Form onSubmit={this.handleSubmit}>
                                                    <fieldset>
                                                        <Form.Group as={Row} onChange={(event) => this.onChangePollDetails(event.target.value)}>
                                                            <Col>
                                                                <br></br>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label={optionOneText}
                                                                    name="formHorizontalRadios"
                                                                    id="formHorizontalRadios1"
                                                                    value="optionOne"
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label={optionTwoText}
                                                                    name="formHorizontalRadios"
                                                                    id="formHorizontalRadios2"
                                                                    value="optionTwo"
                                                                />
                                                            </Col>
                                                        </Form.Group>  
                                                    </fieldset>
                                                    <Form.Group as={Row}>
                                                        <Col>
                                                            <Button 
                                                                variant="primary"
                                                                type="submit"
                                                                disabled={option === ''}
                                                                >
                                                                    Submit
                                                            </Button>
                                                        </Col>
                                                    </Form.Group>
                                                </Form>    
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{`Question created on ${formatDate(timestamp)}`}</small>
                                    </Card.Footer>     
                                </Card>
                            )}
                        </Fragment>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }, props) {
    const { id } = props.match.params

    const question = questions[id]

    console.log('PollDetails component mapStateToProps - users: ', users)
    console.log('PollDetails component mapStateToProps - questions: ', questions)
    console.log('PollDetails component mapStateToProps - authedUser: ', authedUser)
    console.log('PollDetails component mapStateToProps - id: ', id)
    console.log('PollDetails component mapStateToProps - question: ', question)
    return {
        authedUser,
        // EMG - Protection if the question does not exist. For example, if the user goes to some
        // random URL, and questions[id] does not exist. 
        question: question 
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(PollDetails)