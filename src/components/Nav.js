import React from 'react';
import './Nav.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../assets/helo_logo.png'
import home from '../assets/home_logo.png'
import quit from '../assets/shut_down.png'
import axios from 'axios';

const Nav = (props) => {
  const logOut = () => {
    axios.delete('/auth/logout')
    .then(() => props.history.push('/'))
  }
  return (
    <nav>
      <img src={props.img} alt="" />
      <div>{props.username}</div>
      <img src={logo} alt='' />
      <Link to='/'><img src={home} alt='' /></Link>
      <Link to='/new'>Add Post</Link>
      <img onClick={logOut} src={quit} alt='' />
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    username: state.username,
    img: state.profile_pic
  }
}

export default connect(mapStateToProps)(Nav)
 