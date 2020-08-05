import React from 'react'
import classes from './signup.module.css'
import axios from 'axios'

class SignUp extends React.Component{
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

    handleSubmit = () => {
        axios.post('http://localhost:5000/user/signup', {
            username : this.state.username,
            password : this.state.password
        }, {
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.data.success===true){
                this.setState({
                    ...this.state,
                    success : true
                })
            }
        })
    }

    componentDidUpdate() {
        if(this.state.success) {
            this.props.history.push('/login')
        }
    }

    render(){
        return(
            <div className={classes.ContainerDiv}>
                <p>Please Sign Up!</p>
                <input type="text" placeholder="Enter Username" onChange={e => this.changeUsername(e)} />
                <input type="password" placeholder="Password" onChange={e => this.changePassword(e)} />
                <button type="button" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default SignUp