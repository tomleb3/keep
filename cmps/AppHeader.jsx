const { NavLink } = ReactRouterDOM;

export function AppHeader() {
    return <header>
        <NavLink exact to="/"><img src="./assets/imgs/logo.png"></img></NavLink>
    </header>
}