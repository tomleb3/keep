export class KeepNav extends React.Component {
    refItem1 = React.createRef()
    refItem2 = React.createRef()
    refItem3 = React.createRef()
    refItem4 = React.createRef()
    refItem5 = React.createRef()

    toggleClass = (ev) => {
        const btnRefs = [this.refItem1.current, this.refItem2.current, this.refItem3.current, this.refItem4.current, this.refItem5.current]
        btnRefs.forEach(btn => { btn.className = '' })
        ev.target.className = 'active'
    }

    render() {
        return <nav className="keep-nav flex col">
            <ul className="clean-list">Show
                    <li className="active" ref={this.refItem1} onClick={(ev) => {
                    this.props.onSetFilter('')
                    this.toggleClass(ev)
                }}>All</li>
                <li ref={this.refItem2} onClick={(ev) => {
                    this.props.onSetFilter('text')
                    this.toggleClass(ev)
                }}>Text</li>
                <li ref={this.refItem3} onClick={(ev) => {
                    this.props.onSetFilter('image')
                    this.toggleClass(ev)
                }}>Image</li>
                <li ref={this.refItem4} onClick={(ev) => {
                    this.props.onSetFilter('list')
                    this.toggleClass(ev)
                }}>List</li>
                <li ref={this.refItem5} onClick={(ev) => {
                    this.props.onSetFilter('video')
                    this.toggleClass(ev)
                }}>Video</li>
            </ul>
            <button onClick={this.props.onReset}>Reset</button>
        </nav >
    }
}