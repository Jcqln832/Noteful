import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from './noteful-store';
import MainMain from './note/mainmain';
import NoteMain from './note/notemain';
import MainNav from './folder/navmain';
import FolderNav from './folder/navfolder';
import NoteNav from './folder/navnote';
import './App.css';

class App extends Component {

  state = {
    folders: STORE.folders,
    notes: STORE.notes
  };

  render() {
    const { notes, folders } = this.state;
    
    return (
      <div className='App'>
        <nav className='App__nav'>
            <Route 
                exact path='/' 
                render= {() =>
                <MainNav folders={folders}/>
                }
            />
              <Route 
                path='/folder/:folderId'
                render= {() =>
                  <FolderNav folders={folders}/>
                }
              />
              <Route 
                path='/note/:noteId' 
                render= {(routerProps) =>
                  <NoteNav folders={folders} note={notes.find(note => note.id === routerProps.match.params.noteId)}/>
                } 
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
            render= {() =>
            <MainMain notes={notes}/>
            }
          />
          <Route
            path='/folder/:folderId' 
            render= {(routerProps) =>
              <MainMain notes={notes.filter(note => note.folderId === routerProps.match.params.folderId)}/>
            }
          />
          <Route
            path='/note/:noteId' 
            render= {(routerProps) => 
              <NoteMain note={notes.find(note => note.id === routerProps.match.params.noteId)} />
            }
          />
        </main>
      </div>
    )
  }
}

export default App;