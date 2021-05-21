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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useState, useEffect } from "react";
import GenericServices from "../Services/GenericServices";
import UserServices from "../Services/UserServices";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { CloseOutlined, EmailRounded } from "@material-ui/icons";
//import { Autocomplete } from "@material-ui/lab";

const genericServices = new GenericServices();

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

export default function CreateTask() {
  const [data, setData] = useState({
    userId: "",
    createdBy: "",
    taskName: "",
    description: "",
    collaborators: [],
    team: "",
  });
  //const [focus, setFocus] = "";
  const [colValue, setColValue] = useState("");
  //-----------------------------------------------------
  const [regUsers, setRegUsers] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [filteredEmails, setFileredEmails] = useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    genericServices
      .get(`auth/`)
      .then((data) => {
        // const a = Object.entries(...data.email);
        setRegUsers(data);
        extractUserEmails(data);
        //setRegUsers(a);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const extractUserEmails = (data) => {
    const emails = data.map((item) => item.email);
    setUserEmails(emails);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "taskName") {
      setData({ ...data, taskName: value });
    } else if (name == "description") {
      setData({ ...data, description: value });
    } else if (name == "collaborators") {
      data.collaborators.push(value);
    } else if (name == "team") {
      setData({ ...data, team: value });
    }
    console.log(data);
  };

  const getRegUsers = (e) => {
    const { name, value } = e.target;
    console.log("its called", value);
    const a = userEmails.filter((email) => email.includes(value));
    setFileredEmails(a);
    console.log(filteredEmails);
  };

  const addCollaborator = () => {
    const a = { ...data };
    a.collaborators.push(colValue);
    setData(a);
  };

  const handleSubmit = () => {
    const uId = UserServices.getLoggedinfo().userId;
    data.userId = uId;
    const uName = UserServices.getLoggedinfo().username;
    console.log(uName);
    setData({ ...data, createdBy: uName });

    genericServices.post(`task/createTask`, data).then((data) => {
      // window.location.href = "/createTask";
      console.log(data);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Task
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="createdby"
            label="CreatedBy"
            name="createdBy"
            autoComplete="createdBY"
            value={UserServices.getLoggedinfo().username}
            aria-readonly="true"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="taskname"
            label="Task Name"
            name="taskName"
            autoComplete="taskName"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="description"
            label="description"
            name="description"
            autoComplete="description"
            multiline
            rows={5}
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="collaborators"
            label="collaborators"
            name="collaborators"
            autoComplete="collaborators"
            autoFocus
            onChange={getRegUsers}
          />
          <datalist id="browsers">
            {filteredEmails.map((email) => {
              return <option value={email}></option>;
            })}
          </datalist>

          <Box mt={2} mb={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              name="collaborators"
              onChange={handleInputChange}
            >
              {filteredEmails.map((email) => {
                return <MenuItem value={email}>{email}</MenuItem>;
              })}
            </Select>
          </Box>

          <Button variant="contained" color="yellow" onClick={addCollaborator}>
            Add
          </Button>

          <Box mt={2} mb={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              name="team"
              onChange={handleInputChange}
            >
              <MenuItem value="teamA">Team A</MenuItem>
              <MenuItem value="teamB">Team B</MenuItem>
              <MenuItem value="teamC">Team C</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            color="primary"
            //className={classes.submit}
            // onClick={() => {
            //   // axios.post(`${apiUrl}auth/register`, data).then((res) => {
            //   //   console.log(res);
            //   // });
            // }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link href="/createTask" variant="body2">
              <h2>My TASKS</h2>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
