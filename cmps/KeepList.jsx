import { KeepPreview } from "./KeepPreview.jsx"

export function KeepList({ notes, onSaveNotes, onRemove }) {

    notes.sort((a, b) => a.createdAt - b.createdAt)
    notes.sort((a, b) => b.isPinned - a.isPinned)

    return notes.map(note => {
        return <KeepPreview key={note.id} note={note} onSaveNotes={onSaveNotes} onRemove={onRemove} />
    })
}