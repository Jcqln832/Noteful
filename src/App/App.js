import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Main from '../NoteListMain/main';
import NoteMain from '../Note/notemain';
import MainNav from '../folder/navmain';
import FolderNav from '../folder/navfolder';
import NoteNav from '../folder/navnote';
import apiContext from '../apiContext';
import config from '../config';
import './App.css';

class App extends Component {

  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    }
    
    return (
    <apiContext.Provider value={value}>
      <div className='App'>
        <nav className='App__nav'>
            <Route 
                exact path='/' 
                component = {MainNav}

            />
              <Route 
                path='/folder/:folderId'
                component={FolderNav}
              />
              <Route 
                path='/note/:noteId' 
                render = {routeProps => {
                  const { noteId } = routeProps.match.params
                  const note = value.notes.find(note => note.id === routeProps.match.params.noteId)
                  const folder = value.folders.find(folder => folder.id = note.folderId)
                  return (
                    <NoteNav 
                      {...routeProps}
                      noteFolder={folder}
                    />
                  )
                }}
              />
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {/* {' '}
            <FontAwesomeIcon icon='check-double' /> */}
          </h1>
        </header>
        <main className='App__main'>
          <Route
            exact path='/'
            render ={(routerProps) =>
              <Main 
                notes = {value.notes}
              />
            }
          />
          <Route
            path='/folder/:folderId'
            render ={(routerProps) =>
              <Main 
                notes = {value.notes.filter(note => note.folderId === routerProps.match.params.folderId)}
              />
            }
            // component = {Main}
              // <MainMain notes={value.notes.filter(note => note.folderId === routerProps.match.params.folderId)}/>
          />
          <Route
            path='/note/:noteId'
            render ={(routerProps) =>
              <NoteMain 
                note = {value.notes.find(note => note.id === routerProps.match.params.noteId)}
              />
            }
            // component = {NoteMain}
              // <NoteMain note={notes.find(note => note.id === routerProps.match.params.noteId)} />
          />
          {/* <Route 
            path='/add-folder'
            component= {AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          /> */}
        </main>
      </div>
      </apiContext.Provider>
    )
  }
}

export default App;