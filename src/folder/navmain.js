import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import './NoteListNav.css'

const NavMain = (props) => {

  return (
    <div className='Nav'>
      <ul>
      {props.folders.map(folder =>
        <li className="NoteListNav__folder-link" key={folder.id}>
          <NavLink to={`/folder/${folder.id}`}>
            {folder.name}
          </NavLink>
        </li>
         )}
        <li className="NoteListNav__add-folder-button"><NavLink to={`/add-folder`}>
            Add Folder
          </NavLink>
        </li>
      </ul>
    </div>
  )}

export default NavMain;

NavMain.defaultProps = {
  folders: {}
};

NavMain.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
};