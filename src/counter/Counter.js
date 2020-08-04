import React from 'react'
import { connect } from 'react-redux'
import classes from './counter.module.css'
import axios from 'axios'
// import { response } from 'express'

class Counter extends React.Component{

    state = {
        user : '',
        tasks : [],
        newtask : ''
    }

    updateTask = (e) => {
        this.setState({
            ...this.state,
            newtask : e.target.value
        })
    }

    axiosPost = () => {

        axios.post('http://localhost:5000/users', {
            "name" : "ShekharTheGreat",
            "task" : this.state.newtask
        }, {
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            this.setState({
                ...this.state,
                tasks : response.data.tasks
            })
        })

    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
        .then((response) => {
            console.log(response.data)
            this.setState({
                ...this.state,
                user : response.data.name,
                tasks : response.data.tasks
            })
        })
    }

    render(){
        return(
            <div className={classes.Counter}>
                <p className={classes.Welcome}>Welcome {this.state.user}</p>
                <input placeholder="Enter a task" onChange={(e) => this.updateTask(e)} />
                <button onClick={this.axiosPost}>Post</button>
                <ul>
                    {this.state.tasks.map((task, index) => <li key={index} onClick={() => this.props.removeTask(index)}> {task} </li>)}
                </ul>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user : state.user,
        tasks : state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return{
        removeTask : (index) => dispatch({
            type : 'REMOVE_TASK',
            index : index
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)