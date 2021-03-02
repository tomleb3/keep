import { KeepPreview } from "./KeepPreview.jsx"

export function KeepList({ notes, onSaveNotes, onRemove }) {

    notes.sort(function (a, b) { return a.createdAt - b.createdAt })
    notes.sort(function (a, b) { return b.isPinned - a.isPinned })

    return notes.map(note => {
        return <KeepPreview key={note.id} note={note} onSaveNotes={onSaveNotes} onRemove={onRemove} />
    })
}