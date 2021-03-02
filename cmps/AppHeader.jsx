const { NavLink } = ReactRouterDOM;

export function AppHeader() {
    return <header className="flex j-between a-center">
        <NavLink exact to="/"><img src="./assets/imgs/logo.png"></img></NavLink>
    </header>
}