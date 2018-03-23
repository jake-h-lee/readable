import React from 'react'
import { withRouter} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { reduxForm, Field} from 'redux-form'

const EditPostForm = (props) => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div className="col-md-12">
      <form onSubmit={handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Title</label>
          <div className="field">
            <Field
              className="form-control"
              type="text"
              name="title"
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
        <Button type="submit" disabled={pristine || submitting}>Save Changes</Button>
        <Button onClick={()=> props.history.goBack()}>Cancel</Button>
      </form>
    </div>

  )
}

export default withRouter(reduxForm({
  form: 'editPostForm'
})(EditPostForm))
