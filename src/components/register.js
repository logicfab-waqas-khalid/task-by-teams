import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { apiUrl } from "../config/default";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import GenericServices from "../Services/GenericServices";
import axios from "axios";

const genericServices = new GenericServices();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Task-By-Teams"}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [focus, setFocus] = "";
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "userName") {
      setData({ ...data, username: value });
    } else if (name == "email") {
      setData({ ...data, email: value });
    } else if (name == "password") {
      setData({ ...data, password: value });
    }
  };

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="UserName"
            autoFocus
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="Password"
            onChange={handleInputChange}
          />

          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            // onClick={() => {
            //   // axios.post(`${apiUrl}auth/register`, data).then((res) => {
            //   //   console.log(res);
            //   // });
            // }}
            onClick={() => {
              genericServices.post(`auth/register`, data).then((data) => {
                window.location.href = "/login";
                console.log(data);
              });
            }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
