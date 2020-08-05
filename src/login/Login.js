import React from 'react'
import classes from './Login.module.css'
import axios from 'axios'
import { connect } from 'react-redux'

class Login extends React.Component{
    state = {
        username : '',
        password : '',
        success : false
    }

    changeUsername = (e) => {
        this.setState({
            ...this.state,
            username : e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            ...this.state,
            password : e.target.value
        })
    }

    handleSubmit = (e) => {
        axios.post('http://localhost:5000/user/login', {
            username : this.state.username,
            password : this.state.password
        })
        .then(res => {
            console.log(res.data)
            this.props.assignToken(res.data.token)
        })
    }

    render(){
        return(
            <div className={classes.ContainerDiv}>
                <p>Log into your account</p>
                <input type="text" placeholder="Enter Username" onChange={e => this.changeUsername(e)} />
                <input type="password" placeholder="Enter Password" onChange={e => this.changePassword(e)} />
                <button type="button" onClick={this.handleSubmit}>LogIn</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userToken : state.userToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        assignToken : (token) => dispatch({
            type : 'ASSIGN_TOKEN',
            token : token
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)