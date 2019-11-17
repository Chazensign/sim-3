import React from 'react';
import {updatePost} from '../ducks/reducer'
import axios from 'axios';
import {connect} from 'react-redux'

const Form = (props) => {

  const submitPost = () => {
    axios
      .post('/api/post', props.post)
      .then(res => {
        alert(res.data.message)
        props.history.push('/dashboard')
      })
      .catch((err => alert(err.response.data.message)))
  }

  return (
    <div>
      <h2>New Post</h2>
      <form>
        <input onChange={e => props.updatePost(e.target)} name="title" type="text" />
        <img name='img-prev'src={props.img} alt=''/>
        <input value={props.img} onChange={e => props.updatePost(e.target)} name="img" type="text" />
        <textarea onChange={e => props.updatePost(e.target)} name='content'/>
        <button onClick={() => submitPost()} >Post</button>
      </form>
    </div>
  );
}

 
function mapStateToProps(state) {
  const {title, img, content} = state.post
  return {
    post: state.post,
    title: title,
    img: img,
    content: content
  }
}
export default connect(mapStateToProps, {updatePost})(Form);