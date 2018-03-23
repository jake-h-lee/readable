import React, {Component} from 'react'
import EditCommentForm from './EditCommentForm'

class EditComment extends Component {
  constructor(props,context){
    super(props,context)
    this.saveChanges = this.saveChanges.bind(this)
  }

  saveChanges (values){
    this.props.saveComment(values.id, Date.now(), values.body)
    this.props.history.goBack()
  }

  render(){
    const {comments} = this.props
    const commentId = this.props.match.params.comment_id
    const comment = comments.filter(c => (c.id === commentId))[0]
    return (
      <EditCommentForm initialValues={comment} onSubmit={this.saveChanges}/>
    )

  }
}

export default EditComment
