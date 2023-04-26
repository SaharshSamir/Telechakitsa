import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withRouter from "../../withRouter";

function PatientProtectedRoute({ auth, children }) {
    if (!auth.isPatientAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      return children;
}

PatientProtectedRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

let PrivatePatientRoute = connect(mapStateToProps)(withRouter(PatientProtectedRoute));
export default PrivatePatientRoute ; 

// const PrivateRoute = ({ component: Component, auth, ...rest }) => {
// 	console.log(rest);
// 	console.log("component: ", Component);
// 	if(!auth.isPatientAuthenticated){
// 					<Navigate to="/login" />
// 	}
// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				<Component {...props} />
// 			}
// 		/>
// 	)
// 	};

// PrivateRoute.propTypes = {
// 	auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
// 	auth: state.auth
// });

// export default connect(mapStateToProps)(withRouter(PrivateRoute));
