import React from 'react'
import './App.css'
import Counter from './counter/Counter'
import {Route} from 'react-router-dom'
import SignUp from './signup/Signup'
import Login from './login/Login'

class App extends React.Component{
  render(){
    return(
      <div>
        <Route path='/' exact component={Counter} />
        <Route path='/signup' exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </div>
    )
  }
}

export default App