import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import HomapageAdmin from './admin/homepageadmin'
import React from 'react'
import Login from './customer/login'
import CustomerUI from './customer/customerui'
import RegistPage from './customer/register'
import AdminUI from './admin/adminui'
export default function AppRouter() {
    console.log(localStorage.getItem('role'))
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => {
                    return (localStorage.getItem('role') !== "admin") ? <CustomerUI /> : <Redirect to="/admin" />
                }}></Route>
                <Route path="/regis" component={RegistPage}></Route>
                <Route path="/login" component={Login} ></Route>
                <Route path="/admin" render={() => {
                    return (localStorage.getItem('role') === "admin") ? <AdminUI /> : <Redirect to="/" />
                }}></Route>

            </Switch>
        </Router>
    )
}