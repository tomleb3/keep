import { KeepList } from "../cmps/KeepList.jsx"
import { keepService } from "../services/keepService.js"
import { KeepNav } from "../cmps/KeepNav.jsx"

export class KeepApp extends React.Component {

    state = {
        notes: [],
        filterBy: ''
    }

    loadNotes = () => {
        keepService.query().then(notes => {
            this.setState({ notes })
        })
    }

    get notesForDisplay() {
        const { filterBy } = this.state;
        return this.state.notes.filter(note => {
            return note.type.includes(filterBy)
        });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    onSaveNotes = () => {
        keepService.saveNotesToStorage()
        this.setState({})
    }

    onAddNote = () => {
        keepService.addNote().then(() => {
            this.setState({ filterBy: '' })
        })
    }

    onRemoveNote = (noteId) => {
        keepService.removeNote(noteId).then(() => {
            this.loadNotes()
        })
    }

    onReset = () => {
        keepService.clearKeepStorage()
        location.reload()
    }

    componentDidMount() {
        this.loadNotes()
    }

    render() {
        return (
            <article className="keep-app">
                <label className="btn-sidenav display-none" htmlFor="sidenav-checkbox"></label>
                <input id="sidenav-checkbox" className="display-none" type="checkbox"></input>
                <KeepNav onSetFilter={this.onSetFilter} onReset={this.onReset}></KeepNav>
                <section className="keep-list grid j-center">
                    <KeepList notes={this.notesForDisplay} onSaveNotes={this.onSaveNotes} onRemove={this.onRemoveNote} />
                </section>
                <button className="btn-plus" onClick={this.onAddNote}></button>
            </article>
        )
    }
}
