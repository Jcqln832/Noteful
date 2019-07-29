import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ApiContext from '../apiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;


  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(this.props)

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } 
      })
      .then(() => {
        // redirect
        this.context.doRedirect(noteId)
        // database delete
        this.context.deleteNote(noteId)
      })
      .catch(error => {
        console.error("second string", { error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt}/>
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {/* {format(modified, 'Do MMM YYYY')} */}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Note);

Note.defaultProps = {
  id: "",
  name: "",
  modified: "",
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string,
};