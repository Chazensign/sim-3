import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import search from '../assets/search_logo.png'
import Nav from './Nav'
import reducer from '../ducks/reducer'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      filteredPosts: [],
      search: '',
      usersPosts: true
    }
  }

  componentDidMount = () => {
    axios.get('/api/posts').then(res => {
      this.setState({ posts: res.data })
    })
    axios.get('/auth/getsession').then()
    axios.get(`/api/posts/${this.props.userId}`)
    .then(res => this.setState({ filteredPosts: res.data }))
  }
  showUserPosts = () => {
    this.setState({ usersPosts: !this.state.usersPosts})
  }

  clearSearch = () => {
    this.setState({
      search: ''
    })
  }
  howToFilter = () => {
    if (this.state.usersPosts === true) {
      return this.state.filteredPosts
    } else if (this.state.usersPosts === false) {
      return this.state.posts
    }
  }
  handlChange = (trg) => {

  }
  deletePost = () => {}

  render() {
    console.log(this.state.usersPosts, this.props.userId, this.howToFilter())
    return (
      <div className='grey-back'>
        <Nav/>
        <div className='outer-search'>
          <div className='search-cont'>
            <input onChange={e => this.handlChange(e.target)} placeholder='Search by Title' />
            <button className='search'><img src={search} alt='search' /></button>
            <button className='reset' onClick={this.clearSearch}>
              Reset
            </button>
          </div>
          <div className='my-posts'>
            <div>My Posts</div>
            <input
              type='checkbox'
              onChange={() => this.showUserPosts()}
            />
          </div>
        </div>
        <div className='outer-post'>
          {this.howToFilter().map(post => { 
            return (
              <Link
                to={`/post/${post.id}`}>
                <div id={post.id} className='post'>
                  <h1>{post.title}</h1>
                  {this.props.userId === post.author_id ? (
                    <button onClick={() => this.deletePost(post.id)}>
                      Delete
                    </button>
                  ) : null}
                  <div className='name-pic'>
                    <div>{post.username}</div>
                    <div className='post-pic'>
                      <img src={post.profile_pic} alt='' />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { title, img, content } = state.post
  return {
    post: state.post,
    title: title,
    img: img,
    content: content,
    userId: state.id
  }
}

export default connect(mapStateToProps)(Dashboard)
