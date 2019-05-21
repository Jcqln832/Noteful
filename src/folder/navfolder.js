import React from 'react'
import { NavLink } from 'react-router-dom'
import './NotePageNav.css'
import apiContext from '../apiContext';

const NavFolder = (props) => {

    return (
      <apiContext.Consumer>
      {(context) =>
      <div className='Nav'>
        <ul>
        {context.folders.map(folder =>
          <li key={folder.id}>
            <NavLink to={`/folder/${folder.id}`}>
              {folder.name}
            </NavLink>
          </li>
        )}
        </ul>
      </div>
      }
      </apiContext.Consumer>
    )
}

export default NavFolder;