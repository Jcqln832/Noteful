import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import { dom } from '@fortawesome/fontawesome-svg-core';
// import ValidationError from './ValidationError';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    //capture form inputs here to make a controlled form
    this.state = {
      name: "",
      error: ""
    };
  }

  nameChanged(name) {
    this.setState({
      name,
    });
  }

//   validateName(fieldValue) {
//     const fieldErrors = {...this.state.validationMessages};
//     let hasError = false;

//     fieldValue = fieldValue.trim();
//     if(fieldValue.length === 0) {
//       fieldErrors.name = 'Name is required';
//       hasError = true;
//     } else {
//       if (fieldValue.length < 3) {
//         fieldErrors.name = 'Name must be at least 3 characters long';
//         hasError = true;
//       } else {
//         fieldErrors.name = '';
//         hasError = false;
//       }
//     }

//     this.setState({
//       validationMessages: fieldErrors,
//       nameValid: !hasError
//     }, this.formValid );



handleSubmit(e) {
  e.preventDefault();
  const url = `${config.API_ENDPOINT}/folders`;
  const folder = this.state.name;
  const options = {
    method: 'POST',
    body: JSON.stringify({name: folder}),
    headers: {
      "Content-Type": "application/json",
    }

  }
  fetch(url, options)
  .then(res => {
    if(!res.ok) {
      throw new Error('Something went wrong, please try again later.')
    }
    return res.json()
  })
  .then(data => {
    //clear for next entry
    this.setState({
      name: ""
    });
    this.props.addFolder(folder);
    this.props.history.push('/');
  })
  .catch(err => {
    this.setState({
      error: err.message
    });
  });
}

  render () {
    const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
    return (
        <section className='AddFolder'>
            <h2>Create a Folder</h2>
            { error }
            <form className="Noteful-form" onSubmit={e => this.handleSubmit(e)}>
                <div className="field">
                    <label htmlFor="folder-name-input">Name</label>
                    <input type="text" name="name" id="folder-name-input" onChange={e => this.nameChanged(e.target.value)}/>
                    {/* <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>   */}
                </div>
                <div className="buttons">
                    <button type="submit">
                        Save
                    </button>
                </div>
            </form>
        </section>
    )
 }
}

export default withRouter(AddFolder);