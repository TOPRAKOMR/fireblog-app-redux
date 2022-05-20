import {
  Avatar,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import blokPng from "../assets/blok.png";
import { Formik } from "formik";
import * as Yup from "yup";
import googlePng from "../assets/google.png";
import { makeStyles } from "@material-ui/core/styles";
import { login, loginWithGoogle } from "../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    "& .MuiPaper-root": {
      borderRadius: "30px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      height: "fit-content",
      marginTop: 30,
      maxWidth: "500px",
    },
  },
  image: {
    backgroundImage: "url(https://picsum.photos/1600/900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(4, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(25),
    height: theme.spacing(25),
    backgroundColor: "#046582",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#046582",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      color: "#046582",
    },
  },
  header: {
    fontFamily: "Girassol",
    textAlign: "center",
    color: "#046582",
  },
  loadingGif: {
    width: 75,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  googleImg: {
    width: 75,
    marginLeft: 10,
  },
  googleBtn: {
    backgroundColor: "white",
    fontWeight: "bold",
  },
}));

const signUpValidationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("No password provided")
    .min(4, "Password is too short - should be 4 chars minimum"),
  // .matches(/\d+/, "Password must have a number")
  // .matches(/[a-z]+/, "Password must have a lowercase")
  // .matches(/[A-Z]+/, "Password must have a uppercase")
  // .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char"),
});

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values) => {
    login(values.email, values.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        prompt(error.message);
      });
  };

  const handleGoogleProvider = () => {
    loginWithGoogle()
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      prompt(error.message);
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid container justifyContent="center" className={classes.image}>
        <Grid item component={Paper} elevation={6} square xs={12} sm={8} md={6}>
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={blokPng} style={{ width: 200 }} alt="candela" />
            </Avatar>
            <Typography className={classes.header} component="h1" variant="h5">
              Login
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={signUpValidationSchema}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleBlur,
              }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={touched.email && Boolean(errors.email)}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        variant="outlined"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        type="password"
                        helperText={touched.password && errors.password}
                        error={touched.password && Boolean(errors.password)}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                      >
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleGoogleProvider}
                        className={classes.googleBtn}
                      >
                        With
                        <img
                          className={classes.googleImg}
                          src={googlePng}
                          alt="google"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
