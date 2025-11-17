import { useState } from 'react'

const AllNotes = ({ notes, onDelete, onUpdate }) => {
  const [editingNote, setEditingNote] = useState(null)
  const [updatedNote, setUpdatedNote] = useState({ title: '', content: '' })

  const handleEditClick = (note) => {
    setEditingNote(note)
    setUpdatedNote({ 
      title: note.title || '', 
      content: note.content || '' 
    })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    if (!updatedNote.title.trim() && !updatedNote.content.trim()) return
    
    try {
      await onUpdate(editingNote.id, updatedNote)
      setEditingNote(null)
      setUpdatedNote({ title: '', content: '' })
    } catch (error) {
      // Error handling is done in parent component
    }
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
    setUpdatedNote({ title: '', content: '' })
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-6 pb-12">
      {/* Edit Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-[#dadce0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#3c4043]">Edit note</h3>
              <button
                onClick={handleCancelEdit}
                className="w-8 h-8 text-[#5f6368] hover:bg-[#f1f3f4] rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={updatedNote.title}
                onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
                className="w-full text-[#3c4043] text-base font-medium mb-3 p-3 border border-[#dadce0] rounded-xl focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] bg-white"
              />
              <textarea
                placeholder="Take a note..."
                value={updatedNote.content}
                onChange={(e) => setUpdatedNote({ ...updatedNote, content: e.target.value })}
                className="w-full text-[#3c4043] text-sm p-3 border border-[#dadce0] rounded-xl focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] bg-white resize-none"
                rows="4"
              />
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 text-[#5f6368] hover:bg-[#f8f9fa] rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1a73e8] text-white hover:bg-[#1669d6] rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center mt-20">
          <div className="w-24 h-24 bg-[#303134] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📝</span>
          </div>
          <p className="text-[#e8eaed] text-lg font-medium mb-2">No notes yet</p>
          <p className="text-[#9aa0a6] text-sm">Create your first note to get started</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${editingNote ? 'blur-sm' : ''}`}>
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl border border-[#e0e0e0] hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px] break-words"
            >
              <div className="p-4">
                {note.title && (
                  <h3 className="text-[#3c4043] text-base font-medium mb-2 leading-tight">
                    {note.title}
                  </h3>
                )}
                
                <p className="text-[#5f6368] text-sm leading-relaxed whitespace-pre-wrap mb-3">
                  {note.content}
                </p>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3 border-t border-[#f1f3f4]">
                <span className="text-[#9aa0a6] text-xs font-medium">
                  {note.date}
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditClick(note)}
                    className="text-[#5f6368] hover:text-[#1a73e8] text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="text-[#5f6368] hover:text-[#d93025] text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllNotes