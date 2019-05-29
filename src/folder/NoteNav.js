import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

const NoteNav = (props) => {
  return (
    <div className='Nav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        <br />
        Back
      </CircleButton>
      {props.noteFolder && (
      <h3 className='NotePageNav__folder-name'>
        {props.noteFolder.name}
      </h3>
    )}
    </div>
  )
}

export default NoteNav;

NoteNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}