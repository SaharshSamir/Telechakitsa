/*
  Login page
  @imported in App
*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
// Components
import Header from "../app-bar/Header";
// Actions
import { loginUser } from "../../actions/authorizationAction";

const styles = theme => ({
	width: {
		width: "25vw"
	},
	margin: {
		margin: "2vh auto"
	},
	paperWidth: {
		width: "400px",
		height: "350px",
		margin: "10vh auto"
	},
	typographyPadding: {
		paddingTop: "3vh"
	}
});

function Login (props){
    const [state, setState] = useState({
        email: "",
        password: "",
        errors: {}
    });

	useEffect(() => {
    console.log("running", props.history);
        
		if (props.errors) {
			setState({ errors: props.errors });
		}
		if (props.auth.user.typeOfUser === "Doctor" && props.auth.isDoctorAuthenticated && props.history) {
            props.history("/doctor/home");
		}
		if (props.auth.user.typeOfUser === "Patient" && props.auth.isPatientAuthenticated && props.history) {
            props.history("/patient/home");
		}
    }, [props]);

	function onSubmit(ev) {
		ev.preventDefault();
		const userData = {
			email: state.email,
			password: state.password
		};
		props.loginUser(userData);
	}

	function onChange(ev) {
		setState({
            ...state, 
			[ev.target.name]: ev.target.value,
			errors: {}
		});
        console.log(state);
	}

	function loginErr(errMsg) {
		if (errMsg) {
			return <div className="login-err">{errMsg}</div>;
		}
	}

	//function componentWillReceiveProps(nextProps) {
	//	if (nextProps.errors) {
	//		setState({ errors: nextProps.errors });
	//	}
	//	if (nextProps.auth.user.typeOfUser === "Patient") {
	//		if (nextProps.auth.isPatientAuthenticated) {
	//			props.history.push("/patient/home");
	//		}
	//	}
	//	if (nextProps.auth.user.typeOfUser === "Doctor") {
	//		if (nextProps.auth.isDoctorAuthenticated) {
	//			props.history.push("/doctor/home");
	//		}
	//	}
	//}

    const { classes } = props;
    const { errors } = state;
    return (
        <div>
            <Header headerLabel={"Login"} back={true} toLocation="/" />

            <Paper elevation={3} className={classes.paperWidth}>
                <Typography
                    className={classes.typographyPadding}
                    variant="h4"
                    align="center">
                    Log In
                </Typography>

                <form onSubmit={onSubmit}>
                    <div className="login-container">
                        {loginErr(
                            `${
                                errors
                                    ? errors.email
                                        ? errors.email
                                        : errors.password
                                        ? errors.password
                                        : ""
                                    : ""
                            }`
                        )}
                        <FormControl error={errors.email}>
                            <InputLabel>Enter your E-mail</InputLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="E-Mail"
                                className={`${classes.width} ${
                                    classes.margin
                                }`}
                                required={true}
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl error={errors.password}>
                            <InputLabel>Enter your password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={`${classes.width} ${
                                    classes.margin
                                }`}
                                required={true}
                                onChange={onChange}
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={`${classes.width} ${classes.margin}`}
                            onClick={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withStyles(styles)(Login));
