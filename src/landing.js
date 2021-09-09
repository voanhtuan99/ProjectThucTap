import { Redirect } from "react-router";
import { Component } from "react";

class Landing extends Component {
    render() {
        return <Redirect to='/home' />
    }
}

export default Landing