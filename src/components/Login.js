import React, { Component } from 'react'
// EMG - React Router
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { setAuthedUser } from '../actions/authedUser'

import { Container, Jumbotron, Image, Form, Button } from 'react-bootstrap'

class Login extends Component {
    // EMG - The previousPage path is stored in the state of the component so that we can 
    // redirect to it after the selected user is logged in
    state = {
        selectedUser: '',
        toDashboard: false,
        previousPage: this.props.location.pathname,
    }
    componentDidMount() {
        console.log('Login component state - componentDidMount: ', this.state)
        console.log('Login component props - componentDidMount: ', this.props)
        this.props.history.push('/login')
    }
    onChangeLogin = (selectedUser) => {
        console.log('Login component - onChangeLogin. New value for selectedUser: ', selectedUser)
        this.setState(() => ({
            selectedUser
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { selectedUser, toDashboard, previousPage } = this.state
        const { dispatch, location } = this.props
        const { pathname } = location

        console.log('Login component - handleSubmit. Dispatch setAuthedUser: ', selectedUser)
        console.log('Login component - handleSubmit. toDashboard: ', toDashboard)
        console.log('Login component - handleSubmit. pathname: ', pathname)
        console.log('Login component - handleSubmit. previousPage: ', previousPage)
        dispatch(setAuthedUser(selectedUser))

        // EMG - We reset the selectedUser to an empty string, and set to true that we must
        // redirect to the dashboard view
        this.setState(() => ({
            selectedUser: '',
            toDashboard: true,
        }))
        //  this.props.history.push({pathname})
    }
    render() {
        console.log('Login component state: ', this.state)
        console.log('Login component props: ', this.props)
        const { selectedUser, toDashboard, previousPage } = this.state
        const { usersToLogIn, location } = this.props
        const { pathname } = location

        if (toDashboard === true) {
            console.log('Login component - redirect to pathname', pathname)
            console.log('Login component - redirect to previousPage', previousPage)
            if (previousPage === '/login') {
                return <Redirect to='/' />
            } else {
                return <Redirect to={previousPage} />
            }
        }
        // EMG - The user is initially shown a login page where one of the existing users can be chosen, 
        // in order to be logged in.
        return (
            <div>
                <Container className="p-3">
                    <Jumbotron className='center'>
                        <h1>Welcome to the Would You Rather App!</h1>
                        <h2>Please sign in to continue</h2>
                        <Image 
                            src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" rounded 
                            height="142" width="142"
                        />
                        <h3 style={{ color: 'green' }}>Sign In</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="loginForm.ControlSelect1">
                                <Form.Label>Select User</Form.Label>
                                <Form.Control as="select" value={selectedUser} onChange={(event) => this.onChangeLogin(event.target.value)}>
                                    <option key='' value="" disabled>Select User</option>
                                    {usersToLogIn.map((userToLogIn) => (
                                        // <option style={{ "background-image": `url(${userToLogIn[2]})` }} key={userToLogIn[0]} value={userToLogIn[0]}>
                                        <option key={userToLogIn[0]} value={userToLogIn[0]}>
                                            {userToLogIn[1]}
                                            {/* <Image
                                                src={userToLogIn[2]}
                                                alt={`Avatar of ${userToLogIn[1]}`}
                                                className='avatar'
                                            /> */}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" 
                                    type="submit"
                                    // EMG - The button is disabled if no text has been input in either
                                    // of the options
                                    disabled={selectedUser === ''}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    // EMG - See below to perform the conversion of an object to an array of key value pairs in JavaScript
    // https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
    return {
        usersToLogIn: Object.keys(users).map(function(key) {
            return [users[key].id, users[key].name, users[key].avatarURL]
        // EMG - Results are sorted out by name
        // See https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/sort
        }).sort(function (a, b) {
            if (a[1] > b[1]) {
              return 1;
            }
            if (a[1] < b[1]) {
              return -1;
            }
            // a must be equal to b
            return 0;
          })
    }
}

export default connect(mapStateToProps)(Login)