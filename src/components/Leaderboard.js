import React, { Component } from 'react'
import { connect } from 'react-redux'

import Nav from './Nav'
import UserRank from './UserRank'

import { formatUser } from '../utils/helpers'

import { Redirect } from 'react-router-dom'

import { Container, Jumbotron } from 'react-bootstrap'

class Leaderboard extends Component {
    render() {
        console.log('Leaderboard component props: ', this.props)
        const { users, authedUser } = this.props

        // EMG - Redirect to the login view if the authedUser is has not been set
        if (!authedUser) {
            console.log('Leaderboard component - redirect to login')
            return <Redirect to='/login' />
        }
        // EMG - The leaderboard shows the users of the application sorted by their score
        return (
            <div>
                <Nav />
                <Container className="p-3">
                    <Jumbotron className='center'>
                        {Object.entries(users).map(([key,user]) => (
                            <UserRank user={user} rank={parseInt(key) + 1} key={user.id} />
                        ))}
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    const formattedUsers = Object.values(users).map((user) => formatUser(user))
    
    console.log('Leaderboard component mapStateToProps - users: ', users)
    console.log('Leaderboard component mapStateToProps - authedUser: ', authedUser)
    console.log('Leaderboard component mapStateToProps - Object.values(users): ', Object.values(users))
    console.log('Leaderboard component mapStateToProps - formattedUsers: ', formattedUsers)

    return {
        users: formattedUsers.sort((a,b) => b.score - a.score),
        authedUser,
    }
}

export default connect(mapStateToProps)(Leaderboard)