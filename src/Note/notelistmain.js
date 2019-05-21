import React from 'react'
import './NotePageMain.css'

export default function NoteMain(props) {

  return (
    <section className='NotePageMain'>
    
      <h1 className="Note__title">
        {props.note.name}
      </h1>
      <button className="Note__delete" type="button">Delete Note</button>

      <div className='Note__dates'>
        <div className='Note__dates-modified'>
        Modified
        {' '}
          <span className='Date'>
            {/* {format(props.note.modified, 'Do MMM YYYY')} */}
          </span>
          </div>
      </div>
  
      <div className="NotePageMain__content">
      {props.note.content.split(/\n \r|\n/).map((para, i) =>
        <p key={i}>{para}</p>
      )}
      </div>    
    </section>
  )
}

NoteMain.defaultProps = {
  note: {
    content: '',
  }
}