import { utilService } from "../services/utilService.js"

export class KeepPreview extends React.Component {
    refUrl = React.createRef()
    refListItem = React.createRef()
    refNote = React.createRef()

    dynamicNote = () => {
        switch (this.props.note.type) {
            case 'text':
                return <div><textarea className="transparent-input" placeholder="What's on your mind..."
                    name="txt" value={this.props.note.info.txt} onChange={this.handleInputChange}></textarea></div>

            case 'image':
                if (this.props.note.info.url)
                    return <div><img src={this.props.note.info.url}></img></div>
                else {
                    return <form onSubmit={this.onSetUrl}>
                        <input className="transparent-input" type="text" placeholder="URL?" onChange={this.handleInputChange} ref={this.refUrl}></input>
                        <button className="right" type="submit">Save</button>
                    </form>
                }

            case 'list':
                this.sortListItems()
                return this.props.note.info.items.map((item, idx) => {
                    return <aside className="list-container flex a-start" key={utilService.makeId()}>
                        <input type="checkbox" onClick={() => this.onListItemToggle(item)} onChange={this.handleInputChange} checked={item.isChecked} key={utilService.makeId()}></input>
                        <input className="transparent-input" type="text" placeholder="List item" name="list-item" value={item.txt} onChange={(ev) => this.handleInputChange(ev, idx)} key={utilService.makeId()}></input>
                    </aside>
                })

            case 'video':
                if (this.props.note.info.url)
                    return <iframe src={this.props.note.info.url}></iframe>
                else
                    return <form onSubmit={this.onSetUrl}>
                        <input className="transparent-input" type="text" placeholder="URL?" onChange={this.handleInputChange} ref={this.refUrl}></input>
                        <button className="right" type="submit">Save</button>
                    </form>
        }
        return <div className="add-container flex">
            <section className="flex j-around a-center col">
                <button key={utilService.makeId()} onClick={() => this.onSetType('text')}></button>
                <button key={utilService.makeId()} onClick={() => this.onSetType('image')}></button>
            </section>
            <aside className="flex j-around a-center col">
                <button key={utilService.makeId()} onClick={() => this.onSetType('list')}></button>
                <button key={utilService.makeId()} onClick={() => this.onSetType('video')}></button>
            </aside>
        </div>
    }

    onListItemToggle = (todo) => {
        todo.isChecked = !todo.isChecked
    }

    sortListItems = () => {
        this.props.note.info.items.sort((a, b) => a.txt.toLowerCase().localeCompare(b.txt.toLowerCase())) // by name
        this.props.note.info.items.sort(function (a, b) { return a.isChecked - b.isChecked }) // by checked
    }

    onAddListItem = (ev) => {
        ev.preventDefault()
        this.props.note.info.items.push({ txt: this.refListItem.current.value, isChecked: false })
        this.refListItem.current.value = ''
        this.props.onSaveNotes()
    }

    onPinnedToggle = () => {
        this.props.note.isPinned = !this.props.note.isPinned
        this.props.onSaveNotes()
    }

    onSetType = (type) => {
        this.props.note.type = type
        // this.props.onSaveNotes()
        this.setState({})
    }

    onSetUrl = () => {
        let url = this.refUrl.current.value
        if (url.includes('youtube.com/watch?v='))
            url = url.replace('watch?v=', 'embed/')
        this.props.note.info.url = url
        this.props.onSaveNotes()
    }

    onColorChange = (ev) => {
        this.props.note.style.bgc = ev.target.value
        this.props.onSaveNotes()
    }

    handleInputChange = (ev, idx) => {
        if (ev.target.name === 'list-item')
            this.props.note.info.items[idx].txt = ev.target.value
        else
            this.props.note.info[ev.target.name] = ev.target.value
        this.props.onSaveNotes()
    }

    scrollToBottom = () => {
        this.refNote.current.scrollIntoView()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    render() {
        const { note } = this.props

        return (
            <article style={{ backgroundColor: note.style.bgc }} className="keep-preview flex col" ref={this.refNote}>
                <button className={note.isPinned ? "top-pin" : "display-none"} onClick={this.onPinnedToggle}></button>
                <input className="transparent-input" name="title" type="text" placeholder="Title.."
                    value={note.info.title} onChange={this.handleInputChange}></input>

                {this.dynamicNote()}

                { (() => {
                    if (note.type === 'list')
                        return <form className="flex a-start" onSubmit={this.onAddListItem}>
                            <button className="btn-add-item">+</button>
                            <input className="transparent-input" type="text" placeholder="List item" name="add-list-item" ref={this.refListItem} onChange={this.handleInputChange}></input>
                        </form>
                })()}

                <section className="btn-actions flex j-around">
                    <button className={note.isPinned ? "pinned" : "not-pinned"} onClick={this.onPinnedToggle}></button>
                    <label>
                        <input type="color" value={note.style.bgc} onChange={this.onColorChange}></input>
                    </label>
                    <button onClick={() => this.props.onRemove(note.id)}></button>
                </section>

                <p className="muted">Created at {new Date(note.createdAt).toLocaleTimeString("en-US")}
                    &nbsp;{new Date(note.createdAt).toLocaleDateString("en-US")}</p>
            </article>
        )
    }
}