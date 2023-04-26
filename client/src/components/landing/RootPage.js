/*
	The first page that user see, route at "/"
	@imported in App
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// Components
import Header from "../app-bar/Header";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	dimensions: {
		width: "30vw",
		height: "30vw",
		margin: "15vh auto"
	},
	margins: {
		margin: "1vw auto"
	}
});

function RootPage(props) {
    const { classes } = props;
    return (
        <div>
            <Header headerLabel="Telechikitsa" />
            <div className={classes.dimensions}>
                <Typography variant="h4" align="center">
                    Welcome to Telechikitsa
                </Typography>
                <Typography variant="h6" align="center">
                    Simple medical info-system, that allows patients
                    communicate with doctors and vice versa
                </Typography>
                <Link to="/register">
                    <Button
                        className={classes.margins}
                        variant="contained"
                        fullWidth={true}
                        color="secondary"
                        size="large">
                        Register
                    </Button>
                </Link>
                <Link to="/login">
                    <Button
                        variant="outlined"
                        fullWidth={true}
                        color="secondary"
                        size="large">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
}

RootPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RootPage);
