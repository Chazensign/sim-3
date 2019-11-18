import React from 'react';
import './Nav.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import home from '../assets/home_logo.png'
import quit from '../assets/shut_down.png'
import newPost from '../assets/new_logo.png'
import axios from 'axios';
import {setUser} from '../ducks/reducer'


const Nav = (props) => {
  console.log(props)
  
  const logOut = () => {
    axios.delete('/auth/logout')
    .then(() => {
      props.setUser({username: '', profile_pic: '', id: 0})
      props.history.push('/')})
  }

  return props.username ? (
    <nav>
      <div className='profile-img'>
        <img className='profile-pic' src={props.img} alt='' />
      </div>
      <div className='prof-name' >{props.username}</div>
      <Link to='/dashboard'>
        <img className='side-link' src={home} alt='' />
      </Link>
      <Link to='/new'>
        <img className='side-link' src={newPost} alt='' />
      </Link>
      <img
        className='side-link logout'
        onClick={logOut}
        src={quit}
        alt=''
      />
    </nav>
  ) : null
}

function mapStateToProps(state) {
  return {
    username: state.username,
    img: state.profile_pic
  }
}

export default withRouter(connect(mapStateToProps, {setUser})(Nav))
 