import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Image, Row, Col, Badge } from 'react-bootstrap'
import { Fragment } from 'react'

import { Redirect } from 'react-router-dom'

class UserRank extends Component {
    render () {
        console.log('Question component props: ', this.props)
        const { user, authedUser, rank } = this.props

        // EMG - Redirect to the login view if the authedUser has not been set
        if (!authedUser) {
            console.log('UserRank component - redirect to login')
            return <Redirect to='/login' />
        }
        // EMG - For each user in the leaderboard, features their name, avatar, questions created by them, and
        // answered by them, together with a score which is the sum of both
        // created and answered questions. 
        return (
            <Fragment>
                <Card border="primary">
                    <Card.Header><h2>{user.name}</h2></Card.Header>
                    <Card.Body>
                        <Row>  
                            <Col xs={2}>
                                <Image
                                    src={user.avatarURL}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                    fluid
                                    roundedCircle
                                />
                            </Col>  
                            <Col xs={8}>
                                <Card.Title></Card.Title>
                                <Card.Text style={{ fontSize: 'x-large' }}>
                                    <br></br>
                                    {`Answered questions ${user.answeredQuestions}`}
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    {`Created questions ${user.createdQuestions}`}
                                </Card.Text>
                            </Col>
                            <Col xs={2}>
                                <Card.Title style={{ fontSize: 'x-large' }}>Score</Card.Title>
                                <Card.Text>
                                    <br></br>
                                    <br></br>
                                    <Badge style={{ fontSize: 'xx-large' }} variant="success">{`${user.score}`}</Badge>
                                    <br></br>
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{`${user.name} is number ${rank} in the leaderboard!`}</small>
                    </Card.Footer>
                </Card>
                <br />
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser }, {user, rank}) {  
    console.log('PollDetails component mapStateToProps - authedUser: ', authedUser)
    console.log('PollDetails component mapStateToProps - user: ', user)  
    return {
        authedUser,
        user,
        rank,
    }
}

// EMG - Adding withRouter makes the Router props available to us
export default connect(mapStateToProps)(UserRank)