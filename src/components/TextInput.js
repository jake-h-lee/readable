import React from 'react'
import { Field } from 'redux-form'

const TextInput = ({label, name}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="field">
        <Field
          type="text"
          name={name}
          component="input"
          className="form-control"
        />
      </div>
    </div>
  )
}


export default TextInput;
