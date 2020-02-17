import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

import { NavLink, withRouter } from 'react-router-dom'

import { Navbar, Image, Form, Button } from 'react-bootstrap'

class Nav extends Component {
    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props

        console.log('Nav component - handleSubmit. Dispatch setAuthedUser to null.')
        dispatch(setAuthedUser(null))
        console.log('Nav component - redirect to login')
        this.props.history.push('/')
    }
    // EMG - The navigation bar that allows the user to navigate to the leaderboard, to the homepage, 
    // and to the form that allows them to add a new question poll to the system.
    render() {
        console.log('Nav component props: ', this.props)
        const { user } = this.props
        return (
            <Navbar className="bg-light">    
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active'>New Question</NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' exact activeClassName='active'>LeaderBoard</NavLink>
                        </li>
                    </ul>
                </nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Hello, {user.name}                        
                        <Image
                            width="30"
                            height="30"
                            src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                            className='avatar'
                            fluid
                            roundedCircle
                        />
                    </Navbar.Text>
                    <Form inline type="submit" onSubmit={this.handleSubmit}>
                        <Button variant="outline-dark" type="submit" size="sm">Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>        
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        user: Object(users[authedUser])
    }
}

export default withRouter(connect(mapStateToProps)(Nav))