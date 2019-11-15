
module.exports = {

  addPost: (req, res) => {
    const {id} = req.session.user
    const {title, img, content} = req.body
    console.log(req.body);
    const db = req.app.get("db")
    db.add_post([title, img, content, id])
    .then((result) => {
      res.status(201).send({message: 'Post Submitted', result: result})
    })
    .catch(err => res.status(417).send({message: 'Something went wrong'}))
  },
  allPosts: (req, res) => {
    
    
    const db = req.app.get("db")
    db.all_posts()
    .then(result => res.status(200).send(result))
  },
  getPost: (req, res) => {
    console.log(req.params.id);
    const db = req.app.get("db")
    db.get_post(req.params.id)
    .then(result => {
     let data = result[0]
      console.log(data)
      res.status(200).send(data)
    })
  }

}