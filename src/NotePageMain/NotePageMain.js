import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../apiContext'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    // const { notes=[] } = this.context
    // const note = findNote(notes, noteId) || { content: '' }
    const { id, name, content, modified } = this.props.note
    return (
      <section className='NotePageMain'>
        <Note
          id={id}
          name={name}
          modified={modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

// import React from 'react'
// import Note from '../Note/Note'
// import './NotePageMain.css'

// handleDeleteNote = noteId => {
//   this.props.history.push(`/`)
// }

// export default function NotePageMain(props) {

//   return (
//     <section className='NotePageMain'>
//       <Note
//         id={Number(props.note.id)}
//         name={props.note.name}
//         modified={props.note.modified}
//         onDeleteNote = {handleDeleteNote}
//       />
//       <div className='NotePageMain__content'>
//         {props.note.content.split(/\n \r|\n/).map((para, i) =>
//           <p key={i}>{para}</p>
//         )}
//       </div>
//     </section>
//   )
// }

// NotePageMain.defaultProps = {
//   note: {
//     content: '',
//   }
// }
