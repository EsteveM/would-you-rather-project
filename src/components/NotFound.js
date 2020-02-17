import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import Nav from './Nav'

import { Container, Jumbotron, Image } from 'react-bootstrap'

class NotFound extends Component {
    render() {
        console.log('NotFound component props: ', this.props)
        const { authedUser } = this.props

        // EMG - Redirect to the login view if the authedUser has not been set
        if (!authedUser) {
            console.log('NotFound component - redirect to login')
            return <Redirect to='/login' />
        }

        // EMG - The NotFound page is used in a number of cases. For instance, if a user types in the
        // address bar the URL of a question that does not exist 
        // (e.g. http://localhost:3000/questions/thisquestiondoesnotexist), they have to log back in, 
        // and are then shown this 404 page (not found).
        return (
            <div>
                <Nav />
                <Container className="p-3">
                    <Jumbotron className='center'>
                        <h1>Would You Rather App Warning</h1>
                        <h2>Ops! The page you requested has not been found</h2>
                        <Image 
                            src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" rounded 
                            height="142" width="142"
                        />
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

export default connect(mapStateToProps)(NotFound)