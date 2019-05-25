import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './main.css'


export default function Main(props) {
    return (
      <section className='NoteListMain'>
        <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              {note.name}
            </Link>
            <button>Delete Note</button>
          </li>
        )}
        </ul>
      </section>
    )
  }