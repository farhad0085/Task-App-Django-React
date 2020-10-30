import { Route, Switch } from "react-router-dom";
import SigninForm from './components/forms/SigninForm'
import SignupForm from './components/forms/SignupForm'
import Home from './components/Home'
import Logout from './components/Logout'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signin">
                <SigninForm />
            </Route>
            <Route path="/signup">
                <SignupForm />
            </Route>
            <Route path="/logout">
                <Logout />
            </Route>
        </Switch>
    );
}