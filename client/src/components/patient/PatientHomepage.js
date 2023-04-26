/*
	Main component for patient UI, contains tabs
	@imported in App
*/
import React, { Component } from "react";
import withRouter from "../../withRouter";
// Actions
import ProfileActions from "../app-bar/ProfileActions";
// Component
import PatientTabs from "./PatientTabs";

function PatientHomepage(){
	return (
		<div>
			<ProfileActions userRole="Patient" />
			<PatientTabs />
		</div>
	);
}

export default withRouter(PatientHomepage);
