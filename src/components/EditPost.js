import React, {Component} from 'react'
import EditPostForm from './EditPostForm'

class EditPost extends Component {
  constructor(props,context){
    super(props,context)
    this.saveChanges = this.saveChanges.bind(this)
  }

  saveChanges (values){
    this.props.savePost(values.id, values.title, values.body)
    this.props.history.goBack()
  }

  render(){
    const {posts} = this.props
    const postId = this.props.match.params.post_id
    const post = posts.filter(p => (p.id === postId))[0]

    return (
      <EditPostForm initialValues={post} onSubmit={this.saveChanges}/>
    )
  }

}

export default EditPost
