import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './NoteListNav.css';

const FolderNav = (props) => {

    return (
      <div className='Nav'>
        <ul>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink to={`/folder/${folder.id}`}>
              {folder.name}
            </NavLink>
          </li>
        )}
         <li><NavLink to={`/add-folder`}>
            Add Folder
          </NavLink>
          </li>
        </ul>
      </div>
    )
}

export default FolderNav;

FolderNav.defaultProps = {
  folders: []
};

FolderNav.propTypes = {
  folders: PropTypes.array.isRequired
};