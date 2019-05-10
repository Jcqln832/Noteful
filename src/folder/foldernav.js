import React from 'react'
import { NavLink } from 'react-router-dom'

const NavFolder = (props) => {

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
        </ul>
      </div>
    )
}

export default NavFolder;