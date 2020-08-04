import React from 'react'
import { connect } from 'react-redux'
import classes from './counter.module.css'

class Counter extends React.Component{
    render(){
        return(
            <div className={classes.Counter}>
                <p className={classes.Welcome}>Welcome {this.props.user}</p>
                <ul>
                    {this.props.tasks.map((task, index) => <li key={index} onClick={() => this.props.removeTask(index)}> {task} </li>)}
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