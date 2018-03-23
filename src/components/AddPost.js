import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { reduxForm, Field} from 'redux-form'
import TextInput from './TextInput'

const AddPost = (props) => {
  const {showAddModal, closeAddModal, handleSubmit, categories} = props

  return (
    <Modal show={showAddModal} onHide={()=>closeAddModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextInput label="Title" name="title" />
          <TextInput label="Author" name="author" />
          <TextInput label="Body" name="body" />
          <div className="form-group">
            <label>Category</label>
            <div className="field">
              <Field name="category" component="select">
                <option value="">Select a category...</option>
                {categories.map((cat) =>
                  <option value={cat.toLowerCase()} key={cat}>
                    {cat}
                  </option>
                )}
              </Field>
            </div>
          </div>

          <Button type="submit">Save Post</Button>
          <Button onClick={()=>closeAddModal()}>Cancel</Button>

        </form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>

    </Modal>

  )
}

export default reduxForm({
  form: 'addPost'
})(AddPost)
