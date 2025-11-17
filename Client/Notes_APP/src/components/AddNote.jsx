import { useState, useRef } from 'react'

const AddNote = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [note, setNote] = useState({ title: '', content: '' })
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!note.title.trim() && !note.content.trim()) return
    
    onAdd({
      title: note.title.trim(),
      content: note.content.trim()
    })
    
    setNote({ title: '', content: '' })
    setIsExpanded(false)
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleClose = () => {
    if (note.title.trim() || note.content.trim()) {
      handleSubmit(new Event('submit'))
    } else {
      setIsExpanded(false)
    }
  }

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  return (
    <div className="flex justify-center mt-8 px-6">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-[#ffffff] rounded-xl shadow-lg border border-[#e0e0e0] hover:shadow-xl transition-all duration-200"
          style={{ 
            boxShadow: isExpanded 
              ? '0 2px 12px 0 rgba(0,0,0,0.2)' 
              : '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)'
          }}
        >
          <div className="p-4">
            {isExpanded && (
              <input
                type="text"
                placeholder="Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="w-full text-[#3c4043] text-base font-medium mb-3 border-none focus:outline-none placeholder-[#5f6368] bg-transparent"
                autoFocus
              />
            )}
            <textarea
              ref={textareaRef}
              placeholder="Take a note..."
              value={note.content}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => {
                setNote({ ...note, content: e.target.value })
                autoResize()
              }}
              className="w-full text-[#3c4043] text-sm border-none focus:outline-none resize-none placeholder-[#5f6368] bg-transparent min-h-[46px] max-h-[200px] leading-relaxed"
              rows="1"
            />
          </div>
          
          {isExpanded && (
            <div className="flex justify-between items-center px-4 py-3 border-t border-[#f1f3f4]">
              <div className="flex gap-1">
                
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg text-sm font-medium transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddNote