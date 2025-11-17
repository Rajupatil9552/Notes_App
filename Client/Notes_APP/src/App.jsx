import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import AddNote from './components/AddNote'
import AllNotes from './components/AllNotes'
import { notesAPI } from './api/api'

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load notes from backend
  const loadNotes = async () => {
    try {
      setLoading(true)
      setError('')
      const notesData = await notesAPI.getAllNotes()
      
      // Transform backend data to frontend format
      const transformedNotes = notesData.map(note => ({
        id: note._id, // MongoDB _id to id
        title: note.title,
        content: note.description, // description to content
        date: new Date(note.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        createdAt: note.createdAt
      }))
      
      setNotes(transformedNotes)
    } catch (err) {
      console.error('Error loading notes:', err)
      setError(err.message || 'Failed to load notes. Please make sure the backend server is running.')
      setNotes([])
    } finally {
      setLoading(false)
    }
  }

  // Load notes on component mount
  useEffect(() => {
    loadNotes()
  }, [])

  // Add new note
  const handleAddNote = async (newNote) => {
    try {
      setError('')
      // Transform data for backend
      const noteData = {
        title: newNote.title || '',
        description: newNote.content || ''
      }
      
      await notesAPI.createNote(noteData)
      // Reload notes to get the latest from backend including _id
      await loadNotes()
    } catch (err) {
      console.error('Error creating note:', err)
      setError(err.message || 'Failed to create note. Please try again.')
    }
  }

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      setError('')
      await notesAPI.deleteNote(id)
      // Remove from local state immediately for better UX
      setNotes(notes.filter(note => note.id !== id))
    } catch (err) {
      console.error('Error deleting note:', err)
      setError(err.message || 'Failed to delete note. Please try again.')
      // Reload notes to sync with backend
      await loadNotes()
    }
  }

  // Update note
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      setError('')
      // Transform data for backend
      const noteData = {
        title: updatedNote.title || '',
        description: updatedNote.content || ''
      }
      
      await notesAPI.updateNote(id, noteData)
      // Update local state immediately for better UX
      setNotes(notes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              title: updatedNote.title, 
              content: updatedNote.content,
              date: new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })
            }
          : note
      ))
    } catch (err) {
      console.error('Error updating note:', err)
      setError(err.message || 'Failed to update note. Please try again.')
      // Reload notes to sync with backend
      await loadNotes()
    }
  }

  return (
    <div className="min-h-screen bg-[#202124]">
      <Navbar />
      
      {/* Error Message */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md text-center">
          <div className="flex items-center justify-between">
            <span className="flex-1">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-4 text-sm underline hover:no-underline"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="text-white text-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Loading notes...
          </div>
        </div>
      )}
      
      <AddNote onAdd={handleAddNote} />
      
      {/* Only show AllNotes when not loading or there are notes */}
      {!loading && (
        <AllNotes 
          notes={notes}
          onDelete={handleDeleteNote}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  )
}

export default App