import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ApiContext from '../apiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => console.error(e));
        } else {
        // return res.json().then(() => {
          this.context.deleteNote(noteId)
          this.props.doRedirect(noteId)
        }
        });
        // if (!res.ok) 
        //   return res.json().then(e => Promise.reject(e));
        // return res.json()
        // let myJson = res.json();
        // console.log('myJson', myJson);
        // return myJson;
        // .catch(error => {
        //   console.error({ error })
        // });
      // })
      // .then(() => {
      // console.log('1')
      //   this.context.value.deleteNote(noteId)
      //   console.log('2')
      //   // allow parent to perform extra behaviour
      //   this.props.onDeleteNote(noteId)
      //   console.log('3')
      // })
      // .catch(error => {
      //   console.error({ error })
      // })
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
//import PropTypes from 'prop-types';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// export default function Note(props) {

//   return (
//     <apiContext.Consumer>
//         {(value) => {
//         return (
//     <div className='Note'>
//       <h2 className='Note__title'>
//         <Link to={`/note/${props.id}`}>
//           {props.name}
//         </Link>
//       </h2>
//       <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
//         <FontAwesomeIcon icon={faTrashAlt} />
//         {' '}
//         remove
//       </button>
//       <div className='Note__dates'>
//         <div className='Note__dates-modified'>
//           Modified
//           {' '}
//           <span className='Date'>
//             {/* {format(props.modified, 'Do MMM YYYY')} */}
//           </span>
//         </div>
//       </div>
//     </div>
//       )}}
//    </apiContext.Consumer>
//   )
// }

Note.defaultProps = {
  id: "",
  name: "",
  modified: ""
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string
};