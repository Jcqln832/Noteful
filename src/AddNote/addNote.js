import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

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
      folderValid: false,
      formValid: false,
      validationMessages: {
        name: '',
        folder: ''
      }
    }
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

  // Validate note (has name) 
  validateName(fieldValue) {
    fieldValue = fieldValue.trim();
    return (fieldValue.length === 0) ? 'Note name is required' : "";
  }
    
  // Validate folder (is selected)
  validateFolder(fieldValue) {
    fieldValue = fieldValue.trim();
    return (fieldValue.length === 0) ? 'Please choose a folder' : "" ;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("clicked!");
    const name = this.state.name;
    const folder = this.state.folder;
    // Validate form fields before fetch attempt
    this.validateForm(name, folder);
  }

  validateForm(name, folder) {
   const nameMessage =  this.validateName(name);
   const folderMessage =  this.validateFolder(folder);

    this.setState({
      validationMessages: {
        name: nameMessage,
        folder: folderMessage
      },
      nameValid: !nameMessage,
      folderValid: !folderMessage
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: (this.state.nameValid && this.state.folderValid)
    }, () => this.doFetch());
  }

  doFetch() {
    const url = `${config.API_ENDPOINT}/notes`;
    const folder = this.state.folder;
    const storeFolder = this.props.folders.find(item => item.name === folder);
    const name = this.state.name;
    const content = this.state.content;

    if(this.state.formValid) {
      console.log("I ran");
      console.log(this.state.formValid);
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
        }, () => {this.props.addNote(
        {name: name,
        folderId: storeFolder.id,
        content: content,
        id: data.id
      }
        )}
        );
      // );
      //get data back out of Store and re-render app
      // this.props.addNote(
      //     {name: name,
      //     folderId: storeFolder.Id,
      //     content: content}
      // );
      console.log("I ran");
      this.props.history.push('/');
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
  }
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
                    <input type="text" name="name" id="note-name-input" aria-label="New note name" aria-required="true" onChange={e => this.nameChanged(e.target.value)}/>
                    {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                </div>
                <div className="field">
                    <label htmlFor="folder-content-input">Content</label>
                    <input type="text" name="content" id="content-name-input" aria-label="Enter note content" onChange={e => this.contentChanged(e.target.value)}/>
                    {/* <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>   */}
                </div>
                <div className="field">
                    <label htmlFor="folder-name-input">Folder</label>
                    <select name="folder-name-input" id="folder-name-input" aria-label="Choose a folder" aria-required="true" onChange={e => this.folderChanged(e.target.value)}>
                        <option value ="None">Select one...</option>
                        {options}
                    </select>    
                    {<ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder}/>}
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

AddNote.defaultProps = {
  history: {
    goBack: () => {}
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired
};