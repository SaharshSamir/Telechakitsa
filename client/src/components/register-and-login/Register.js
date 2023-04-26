/*
	Register component
	@imported in App
*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import withRouter from "../../withRouter";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useNavigate} from "react-router-dom"; 
// Helpers
import getRandomMaterialColor from "../../helpers/getRandomMaterialColor";
// Components
import Header from "../app-bar/Header";
// Actions
import {
	registerDoctor,
	registerPatient
} from "../../actions/authorizationAction";

const styles = theme => ({
	paper: {
		width: "50vw",
		margin: "3vh auto",
		paddingTop: "5vh"
	},
	layout: {
		width: "60%",
		height: "100%",
		margin: "3vh auto",
		display: "flex",
		flexDirection: "column"
	},
	row: {
		flexDirection: "row",
		marginBottom: "5vh"
	},
	buttonLayout: {
		width: "48%",
		margin: "auto"
	},
	typographyPadding: {
		paddingTop: "3vh"
	},
	marginTop: {
		marginTop: "5vh"
	}
});

function Register(props){
    console.log(JSON.stringify(props));
    const navigate = useNavigate();
    const [state, setState] = useState({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			password2: "",
			typeOfUser: "",
			errors: {}
		});

	function onChange(ev) {
        console.log("running");
		setState({
            ...state, 
			[ev.target.name]: ev.target.value,
			errors: {}
		});
        console.log(state);
	}

	function registerErr(errMsg) {
		if (errMsg) {
			return <div className="register-err">{errMsg}</div>;
		}
	}

	function onSubmit(ev) {
		ev.preventDefault();
        console.log(state);
		const userData = {
			firstName: state.firstName,
			lastName: state.lastName,
			email: state.email,
			password: state.password,
			password2: state.password2,
			typeOfUser: state.typeOfUser,
			color: getRandomMaterialColor()
		};

        console.log(userData);

		if (state.typeOfUser === "Doctor") {
			props.registerDoctor(userData, props.router.history);
		}
		if (state.typeOfUser === "Patient") {
			props.registerPatient(userData, props.router.history);
		}
	}

	useEffect(() => {
        console.log(props.router);
        props.router.history("/somwhereelse");
        if (props.auth.isAuthenticated) {
            //props.history.push("/dashboard");
            navigate("/dashboard");
        }
    }, []); 
	function componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			setState({ errors: nextProps.errors });
		}
	}

    const { classes } = props;
    const { errors } = state;
    return (
        <div>
            <Header headerLabel="Register" back={true} toLocation="/" />
            <Paper elevation={3} className={classes.paper}>
                <Typography
                    className={classes.typographyPadding}
                    variant="h4"
                    align="center">
                    Register
                </Typography>
                <form onSubmit={onSubmit}>
                    <div className={classes.layout}>
                        <FormControl error={errors.firstName}>
                            {/*<InputLabel>First name</InputLabel>*/}
                            <Input
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                required={true}
                                onChange={onChange}
                            />
                            {registerErr(
                                `${
                                    errors.firstName ? errors.firstName : ""
                                }`
                            )}
                        </FormControl>

                        <FormControl
                            className={classes.marginTop}
                            error={errors.lastName}>
                            {/*<InputLabel>Last name</InputLabel>*/}
                            <Input
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                required={true}
                                onChange={onChange}
                            />
                            {registerErr(
                                `${errors.lastName ? errors.lastName : ""}`
                            )}
                        </FormControl>

                        <FormControl
                            className={classes.marginTop}
                            error={errors.email}>
                            {/*<InputLabel>E-mail</InputLabel>*/}
                            <Input
                                name="email"
                                type="email"
                                placeholder="Enter your E-mail"
                                required={true}
                                onChange={onChange}
                            />
                            {registerErr(
                                `${errors.email ? errors.email : ""}`
                            )}
                        </FormControl>

                        <FormControl
                            className={classes.marginTop}
                            error={errors.password}>
                            {/*<InputLabel>Password</InputLabel>*/}
                            <Input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required={true}
                                onChange={onChange}
                            />
                            {registerErr(
                                `${errors.password ? errors.password : ""}`
                            )}
                        </FormControl>

                        <FormControl
                            className={classes.marginTop}
                            error={errors.password2}>
                            {/*<InputLabel>Password confirm</InputLabel>*/}
                            <Input
                                name="password2"
                                type="password"
                                placeholder="Confirm your password"
                                required={true}
                                onChange={onChange}
                            />
                            {registerErr(
                                `${
                                    errors.password2 ? errors.password2 : ""
                                }`
                            )}
                        </FormControl>

                        <FormControl
                            className={classes.marginTop}
                            required
                            error={errors.typeOfUser}
                            component="fieldset">
                            <FormLabel component="legend">
                                Choose your role
                            </FormLabel>
                            <RadioGroup
                                name="typeOfUser"
                                required
                                value={state.typeOfValue}
                                onChange={onChange}>
                                <FormControlLabel
                                    value="Doctor"
                                    control={<Radio color="secondary" />}
                                    label="Doctor"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="Patient"
                                    control={<Radio color="secondary" />}
                                    label="Patient"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <FormHelperText>
                                You can`t change this in future
                            </FormHelperText>
                            {registerErr(
                                `${
                                    errors.typeOfUser
                                        ? errors.typeOfUser
                                        : ""
                                }`
                            )}
                        </FormControl>
                        <FormControl
                            className={`${classes.marginTop} ${
                                classes.row
                            }`}>
                            <Button
                                className={classes.buttonLayout}
                                variant="contained"
                                color="secondary"
                                type="submit">
                                Register
                            </Button>
                            <Button
                                className={classes.buttonLayout}
                                variant="outlined"
                                color="secondary"
                                onClick={onSubmit}
                                href="/">
                                Cancel
                            </Button>
                        </FormControl>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

Register.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	general: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	general: state.general
});

export default connect(
	mapStateToProps,
	{ registerDoctor, registerPatient }
)(withStyles(styles)(withRouter(Register)));
