/*
	Main cimponent that shows for doctor and contain all tabs and info
	@imported in App
*/
import React from "react";
import withRouter from "../../withRouter";
// Components
import ProfileActions from "../app-bar/ProfileActions";
import DoctorTabs from "./DoctorTabs";

function DoctorDashboard() {
    return (
        <div>
            <ProfileActions userRole="Doctor" />
            <DoctorTabs />
        </div>
    );
}

export default withRouter(DoctorDashboard);
