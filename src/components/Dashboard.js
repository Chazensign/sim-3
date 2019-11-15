import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import './Dashboard.css'
import {Link} from 'react-router-dom'



class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      search: '',
      usersPosts: false
    }
  }

  componentDidMount = () => {
    console.log('hi')
    axios.get('/api/posts')
    .then(res => {
      this.setState({ posts: res.data });
      console.log(res.data)
      })
      axios.get('/auth/getsession')
      .then()
  }
  showUserPosts = (value) => {
    this.setState({ userPosts: value });
  }
// editPost = () => {
//   this.state
// }

  deletePost = () => {

  }

  
render() {
  console.log(window.session)
  return ( 
    // { true ? (
    <div className='outer-post'>
      <div>
        <input placeholder='Search by Title' />
        <input type='radio' onClick={e => this.showUserPosts(e.target.value)} value={true}/>
      </div>
      {this.state.posts.map(post => {
        return (
          <Link to={`/post/${post.id}`}>
            <div
              id={post.id}
              hidden={this.state.usersPosts}
              className="post"
            >
              <h1>{post.title}</h1>
              <div>{post.username}</div>
              <img src={post.profile_pic} alt="" />
              <button>Edit</button>
            </div>
          </Link>
        );
      })}
    </div>
    // ) : null }
   );
  }


}
function mapStateToProps(state) {
  const { title, img, content } = state.post;
  return {
    post: state.post,
    title: title,
    img: img,
    content: content
  };
}

export default connect(mapStateToProps)(Dashboard);