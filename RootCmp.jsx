import { AppHeader } from "./cmps/AppHeader.jsx"
import { KeepApp } from "./pages/KeepApp.jsx"

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export class AppSus extends React.Component {
    render() {
        return <Router>
            <section className="app-sus">
                <AppHeader />
                <Switch>
                    <Route path="/" component={KeepApp} />
                </Switch>
            </section>
        </Router>
    }
}