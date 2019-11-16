import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

class Post extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      post: {},
      hidden: true
     }
    }

    componentDidUpdate = () => {
      console.log('Component Updated')
    }
    
    componentDidMount = () => {
    axios.get(`/api/post/${this.props.match.params.postid}`)
    .then(res => {
      console.log(res.data)
      this.setState({ post: res.data });

    })

    axios.get('/auth/getsession')
    .then(res => console.log(res))
  }
  editToggle = () => {
    this.setState({ hidden: !this.state.hidden });
  }
  updatePost = () => {
    axios.put('/api/post', this.state.post)
  }

  render() {
    console.log(this.state.post.author_id, this.props.userId);
    const {title, img, content, id, author_id} = this.state.post
  return ( 
    <div>
      <h1>
      {title}
      </h1>
      <input hidden={this.state.hidden} />
      <img src={img} alt=''/>
      <p>{content}</p>
      {+this.state.post.author_id === +this.props.userId ? <button onClick={this.editToggle}>Edit</button> : null }
    </div>
   );
  }
}
 function mapStateToProps(state) {
   const { userId } = state.post;
   return {
     userId: userId
   };
 }

 export default connect(mapStateToProps)(Post);
