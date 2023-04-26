import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import withRouter from "../../withRouter";
import PropTypes from "prop-types";

function DoctorProtectedRoute({ auth, children }) {
    if (!auth.isDoctorAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      return children;
}

DoctorProtectedRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

let PrivateDoctorRoute = connect(mapStateToProps)(withRouter(DoctorProtectedRoute));
export default PrivateDoctorRoute;

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
// 	<Route
// 		{...rest}
// 		component={props =>
// 			auth.isDoctorAuthenticated === true ? (
// 				<Component {...props} />
// 			) : (
// 				<Navigate to="/login" />
// 			)
// 		}
// 	/>
// );

// PrivateRoute.propTypes = {
// 	auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
// 	auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
