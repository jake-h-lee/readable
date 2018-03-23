import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { reduxForm, Field} from 'redux-form'

const AddCommentModal = (props) => {
  const {showAddCommentModal, closeAddCommentModal, handleSubmit} = props

  return (
    <Modal show={showAddCommentModal} onHide={()=>closeAddCommentModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Author</label>
            <div className="field">
              <Field
                className="form-control"
                type="text"
                name="author"
                component="input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Body</label>
            <div className="field">
              <Field
                className="form-control"
                type="text"
                name="body"
                component="input"
              />
            </div>
          </div>
          <Button type="submit">Save Comment</Button>
          <Button onClick={()=>closeAddCommentModal()}>Cancel</Button>

        </form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>

    </Modal>

  )
}

export default reduxForm({
  form: 'addComment'
})(AddCommentModal)
