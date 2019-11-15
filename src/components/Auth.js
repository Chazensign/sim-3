import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {setUser} from '../ducks/reducer'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''
     }
     this.userLogin = this.userLogin.bind(this)
     this.userRegister = this.userRegister.bind(this)
  }

handleChange = (trg) => {
  const {name, value} = trg
  this.setState({ [name]: value });
}

 userLogin = function() {
  axios
  .post('/auth/login', this.state)
  .then(res => {
    this.props.setUser(res.data.user)
    alert(res.data.message)
    this.setState({ username: '', password: '' })
    this.props.history.push('/dashboard')
  })
  .catch(err => {
    console.log(err);
    alert(err.response.data.message)
  })
}

userRegister = function() {
  axios
    .post("/auth/register", this.state)
    .then(res => {
      this.props.setUser(res.data.user);
      alert(res.data.message);
      this.setState({ username: "", password: "" });
    })
    .catch(err => alert(err.response.data.message))
}

  render() { 
    return ( 
      <div className='login-box'>
        <input name='username' type="text" onChange={e => this.handleChange(e.target)} />
        <input name='password' type="text" onChange={e => this.handleChange(e.target)} />
        <button onClick={this.userLogin}>Login</button>
        <button onClick={this.userRegister}>Register</button>
      </div>
     );
  }
}
 function mapStateToProps(state) {
   return state;
 }
export default connect(mapStateToProps, {setUser})(Auth);