import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import HomePage from "./HomePage";
import { baseUrl } from "../api/config";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [userData, setUserData] = useState({});

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  //   const handleChange = (e) => {
  //     setData({
  //       ...data,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const UserLogin = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/UserAccess/Authenticate`,
        data
      );
      console.log(response);
      setMsg("");
      setUserData(response.data.data)
      setShow(true);
      clearFields();
    } catch (err) {
      console.log(err);
      setMsg(err.response.data.responseMessage);
    } finally {
    }
  };

  const validateSchema = () => {
    const error = {};
    const { emailOrUserName, password } = data;

    if (emailOrUserName === "") {
      error.emailOrUserName = "This field is required";
    }

    if (password === "") {
      error.password = "This field is required";
    }
    return error;
  };

  const clearFields = () => {
    setData({
      emailOrUserName: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorList = validateSchema();
    setErrors(errorList);
    if (Object.keys(errorList).length > 0) return;
    setErrors({});
    UserLogin();
  };

  console.log(data);
  return (
    <div>
      {!show && (
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "end" }}
        >
          <Grid item>
            <label>Username</label>
            <br />
            <TextField
              name="emailOrUserName"
              type="text"
              onChange={handleChange}
              value={data.emailOrUserName}
              error={errors.emailOrUserName ? true : false}
            />
            {errors && errors.emailOrUserName && (
              <Typography sx={{ color: "red", fontSize: "0.8em" }}>
                {errors.emailOrUserName}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <label>Password</label>
            <br />
            <TextField
              name="password"
              type="text"
              onChange={handleChange}
              value={data.password}
              error={errors.password ? true : false}
            />
            {errors && errors.password && (
              <Typography sx={{ color: "red", fontSize: "0.8em" }}>
                {errors.password}
              </Typography>
            )}
          </Grid>

          <Grid>
            <Button type="submit" onClick={handleSubmit} variant="contained">
              LOGIN
            </Button>
          </Grid>
        </Grid>
      )}
      {msg && (
        <Grid>
          <Typography sx={{ color: "red", fontSize: "0.8em" }}>
            {msg}
          </Typography>
        </Grid>
      )}

      {show && <HomePage userData={userData}   />}
    </div>
  );
};

export default Login;
