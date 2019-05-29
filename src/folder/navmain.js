import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavMain = (props) => {

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
  )}

export default NavMain;

NavMain.defaultProps = {
  folders: {}
};

NavMain.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
};