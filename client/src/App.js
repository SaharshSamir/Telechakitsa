import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./sass/App.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
// Components
import RootPage from "./components/landing/RootPage";
import Login from "./components/register-and-login/Login";
import Register from "./components/register-and-login/Register";

import PrivateDoctorRoute from "./components/utils/PrivateDoctorRoute";
import PrivatePatientRoute from "./components/utils/PrivatePatientRoute";

import DoctorHomepage from "./components/doctor/DoctorHomepage";
import PatientHomepage from "./components/patient/PatientHomepage";
import PatientSettings from "./components/settings/PatientSettings";
import DoctorSettings from "./components/settings/DoctorSettings";
import { connect } from "react-redux";
import withRouter from "./withRouter";
import PropTypes from "prop-types";
// Actions
import { setCurrentUser } from "./actions/authorizationAction";

// Check for token
if (localStorage.getItem("jwtToken")) {
	// Set auth token header auth
	setAuthToken(localStorage.getItem("jwtToken"));
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.getItem("jwtToken"));
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}

function Landing() {
    return (
        <PatientHomepage />
    )
}

function App() {
    // return <PatientHomepage />
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<RootPage />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route path="/patient/home"
                        element={
                            <PrivatePatientRoute>
                                <PatientHomepage />
                            </PrivatePatientRoute>
                        } />
                        <Route path="/doctor/home"
                        element={
                            <PrivateDoctorRoute>
                                <DoctorHomepage />
                            </PrivateDoctorRoute>
                        } />
                        {/* <PrivatePatientRoute
                            exact
                            path="/patient/home"
                            component={PatientHomepage}
                        /> */}
                        {/* <PrivateDoctorRoute
                            exact
                            path="/doctor/home"
                            component={DoctorHomepage}
                        />
                        <PrivatePatientRoute
                            exact
                            path="/patient/home/settings"
                            component={PatientSettings}
                        />
                        <PrivateDoctorRoute
                            exact
                            path="/doctor/home/settings"
                            component={DoctorSettings}
                        /> */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

/*
                        <PrivatePatientRoute
                            exact
                            path="/patient/home"
                            component={PatientHomepage}
                        />
                        <PrivateDoctorRoute
                            exact
                            path="/doctor/home"
                            component={DoctorHomepage}
                        />
                        <PrivatePatientRoute
                            exact
                            path="/patient/home/settings"
                            component={PatientSettings}
                        />
                        <PrivateDoctorRoute
                            exact
                            path="/doctor/home/settings"
                            component={DoctorSettings}
                        />
    */
