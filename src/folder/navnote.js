import React from 'react'
import { NavLink } from 'react-router-dom'

const NoteNav = (props) => {
    return (
      <div className='Nav'>
        <NavLink to={`/folder/${props.noteFolder.id}`} className="NotePageNav_back-button">Go back</NavLink>
        <p className="NotePageNav_folder-name">{props.noteFolder.name}</p>
      </div>
    )
  }

export default NoteNav;