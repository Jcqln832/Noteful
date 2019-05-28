import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import MainNav from '../folder/navmain';
import FolderNav from '../folder/navfolder';
import NoteNav from '../folder/NoteNav';
import AddFolder from '../AddFolder/addFolder'
import AddNote from '../AddNote/addNote'
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
        if (!notesRes.ok) {
          return notesRes.json().then(e => Promise.reject(e))
        }
        if (!foldersRes.ok) {
          return foldersRes.json().then(e => Promise.reject(e))
        }
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

  addFolder = (folder) => {
    console.dir(this);
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      addNote: this.addNote,
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
                const note = value.notes.find(note => note.id === routeProps.match.params.noteId)
                const folder = value.folders.find(folder => folder.id === note.folderId)
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
            {' '}
            <FontAwesomeIcon icon={faCheckDouble} />
          </h1>
        </header>
        <main className='App__main'>
          <Route
            exact path='/'
            render ={(routerProps) =>
              <NoteListMain 
                notes = {value.notes}
              />
            }
          />
          <Route
            path='/folder/:folderId'
            render ={(routerProps) =>
              <NoteListMain 
                notes = {value.notes.filter(note => note.folderId === routerProps.match.params.folderId)}
              />
            }
          />
          <Route
            path='/note/:noteId'
            render ={(routerProps) =>
              <NotePageMain 
                note = {value.notes.find(note => note.id === routerProps.match.params.noteId)}
              />
            }
          />
          <Route 
            path='/add-folder'
            render ={(routerProps) =>
              <AddFolder
                addFolder = {value.addFolder}
              />
            }
          />
          <Route
            path='/add-note'
            render = {(routerProps) =>
              <AddNote
                folders={value.folders}
                addNote = {value.addNote}
              />
            }
          />
        </main>
      </div>
      </apiContext.Provider>
    )
  }
}

export default App;