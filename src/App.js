import { Component } from "react";
import {Switch, Route} from 'react-router-dom';
import LoginForm from "./Components/LoginForm";
import TodoApplication from "./Components/TodoApplication";

class App extends Component{
  render(){
    return(
        <Switch>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/" component={TodoApplication}/>
        </Switch>
    )
  }
}

export default App;