import { SET_PATIENT, SET_DOCTOR, LOGOUT, GET_ERRORS } from "./constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../helpers/setAuthToken";

// Register doctor
export const registerDoctor = (userdata, history) => dispatch => {
	console.log(history);
	axios
		.post("/api/doctors/register", {
			userdata
		})
		.then(res => {
			history("/login");
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				data: err.response.data
			})
		);
};

// Register patient
export const registerPatient = (userdata, history) => dispatch => {
    console.log(history);
	axios
		.post("/api/patients/register", {
			userdata
		})
		.then(res => {
			history("/login");
		})
		.catch(err => {
            console.log(err);
			dispatch({
				type: GET_ERRORS,
				data: err.res.data
			})
        }
		);
};

// Login user
export const loginUser = userdata => dispatch => {
	console.log("user data", userdata);
	// fetch("http://localhost:3000/api/user/login", {
	// 	method: "POST", 
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	  },
	// 	body: JSON.stringify(userdata)
	// })
	 axios
	 	.post("http://localhost:3000/api/user/login", {
	 		userdata
	 	})
		.then(res => {
            console.log("login response", res);
			if (res.data.token) {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwtDecode(token);
				console.log("decoded", decoded);
				dispatch(setCurrentUser(decoded));
			}
		})
		.catch(err => {
            console.log(err);
            if(err.res) {
                dispatch({
                    type: GET_ERRORS,
                    data: err.res.data
                });
            }
		});
};

// Logout user
export const logout = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

// Set current user authenticated
export const setCurrentUser = decoded => {
	console.log(decoded.typeOfUser);
	switch (decoded.typeOfUser) {
		case "Doctor":
			return {
				type: SET_DOCTOR,
				data: decoded
			};
		case "Patient":
			return {
				type: SET_PATIENT,
				data: decoded
			};
		default:
			return {
				type: LOGOUT,
				data: {}
			};
	}
};
