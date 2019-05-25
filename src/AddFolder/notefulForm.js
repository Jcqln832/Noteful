import React, { Component } from 'react';
import ValidationError from './ValidationError';

class NotefulForm extends Component {

  constructor(props) {
    super(props);
  }

  captureFolder(name) {
    // this.setState({name}, () => {this.validateName(name)});
    //submit to POST /nost endpoint on server
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

  }

  render () {
    return (
        <section className='AddFolder'>
            <h2>Create a Folder</h2>
            <form className="Noteful-form" onSubmit={e => props.addFolder(e)}>
                <div className="field">
                    <label htmlFor="folder-name-input">Name</label>
                    <input type="text" name="name" id="folder-name-input" onChange={e => this.captureFolder(e.target.value)}/>
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>  
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
export default NotefulForm;