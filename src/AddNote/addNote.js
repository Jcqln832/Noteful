import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import ValidationError from '../ValidationError';

class AddNote extends Component {
  constructor(props) {
    super(props);
    //capture form inputs here to make a controlled form
    this.state = {
      name: "",
      content: "",
      folder: "",
      error: "",
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: ''
      }
    };
  }

  nameChanged(name) {
    this.setState({name})
    // () => {this.validateName(name)});
    }

  contentChanged(content) {
    this.setState({
      content
    });
  }

  folderChanged(folder) {
    this.setState({
      folder
    });
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  // Validate note name 
  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Note name is required';
      hasError = true;
    } else {
      fieldErrors.name = "";
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, this.formValid );
  }

handleSubmit(e) {
  e.preventDefault();
  const url = `${config.API_ENDPOINT}/notes`;
  const folder = this.state.folder;
  const storeFolder = this.props.folders.find(item => item.name === folder);
  const name = this.state.name;
  const content = this.state.content;
  const options = {
    method: 'POST',
    body: JSON.stringify({
        name: name,
        folderId: storeFolder.id,
        content: content
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }

// prevent submit without title/name field filled in
this.validateName(name);
if(this.state.nameValid === false) {
  return;
}

  // put the data into STORE(db)
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
      name: "",
      content: "",
      folder: ""
    });
    //get data back out of Store and re-render app
    this.props.addNote(
        {name: name,
        folderId: storeFolder.Id,
        content: content}
    );
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
    const options = this.props.folders.map(
        (folder, i) => <option value={folder.name} key={i}>{folder.name}</option> 
    )
    return (
        <section className='AddNote'>
            <h2>Create a Note</h2>
            { error }
            <form className="Noteful-form" onSubmit={e => this.handleSubmit(e)}>
                <div className="field">
                    <label htmlFor="note-name-input">Title</label>
                    <input type="text" name="name" id="note-name-input" onChange={e => this.nameChanged(e.target.value)}/>
                    {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                </div>
                <div className="field">
                    <label htmlFor="folder-content-input">Content</label>
                    <input type="text" name="content" id="content-name-input" onChange={e => this.contentChanged(e.target.value)}/>
                    {/* <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>   */}
                </div>
                <div className="field">
                    <label htmlFor="folder-name-input">Folder</label>
                    <select name="folder-name-input" id="folder-name-input" onChange={e => this.folderChanged(e.target.value)}>
                        <option value ="None">Select one...</option>
                        {options}
                    </select>    
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

export default withRouter(AddNote);