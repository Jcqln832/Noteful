import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
// import ValidationError from '../ValidationError';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    //capture form inputs here to make a controlled form
    this.state = {
      name: "",
      error: "",
      nameValid: false,
      validationMessages: {
        name: ''
      }
    };
  }

  nameChanged(name) {
    this.setState({
      name,
    });
  }

  // validateFolder(fieldValue) {
  //   const fieldErrors = {...this.state.validationMessages};
  //   let hasError = false;

  //   fieldValue = fieldValue.trim();
  //   if(fieldValue.length === 0) {
  //     fieldErrors.name = 'Name is required';
  //     hasError = true;
  //     } else {
  //       fieldErrors.name = '';
  //       hasError = false;
  //     }
  //   }

  //   this.setState({
  //     validationMessages: fieldErrors,
  //     nameValid: !hasError
  //   }, this.formValid );



handleSubmit(e) {
  e.preventDefault();
  const url = `${config.API_ENDPOINT}/folders`;
  const folder = this.state.name;
  const options = {
    method: 'POST',
    body: JSON.stringify({title: folder}),
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
    this.props.addFolder(data);
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
                    <input type="text" name="name" id="folder-name-input" aria-label="New folder name" aria-required="true" onChange={e => this.nameChanged(e.target.value)}/>
                     {/* { <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/> } */}
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

AddFolder.defaultProps = {
  history: {
    goBack: () => {}
  }
}

AddFolder.propTypes = {
  addFolder: PropTypes.func.isRequired
};