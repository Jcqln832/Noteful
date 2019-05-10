import React from 'react'
import { NavLink } from 'react-router-dom'

const NoteNav = (props) => {
    const noteFolder = props.folders.find(folder => folder.id === props.note.folderId)
    return (
      <div className='Nav'>
        <NavLink to={`/folder/${noteFolder.id}`} className="NotePageNav_back-button">Go back</NavLink>
        
        <p className="NotePageNav_folder-name">{noteFolder.name}</p>
   
      </div>
    )
}

export default NoteNav;