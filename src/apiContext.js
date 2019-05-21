import React from 'react'

const apiContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
})

export default apiContext