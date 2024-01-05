import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import SignupLayout from "layouts/authentication/components/SignupLayout";
import PropTypes from "prop-types";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Swal from "sweetalert2";
//Axios
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";

function Basic() {
  //value container of inputs
  const [registerFname, setFname] = useState("");
  const [registerMname, setMname] = useState("");
  const [registerLname, setLname] = useState("");
  const [registerAddress, setAddress] = useState("");
  const [registerStreet, setStreet] = useState("");
  const [registerBday, setBday] = useState("01/01/2023");
  const [registerEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pnumError, setPnumError] = useState("");
  const [registerPnum, setPnum] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [registerPass, setPass] = useState("");
  const [registerCPass, setCPass] = useState("");
  const [registerGender, setGender] = useState("");

  const validateEmail = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return ""; // No error when the email field is empty
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    } else {
      return "";
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for a valid phone number
    const phoneRegex = /^(09|\+639)\d{9}$/;

    if (!phoneNumber) {
      return ""; // No error when the phone number field is empty
    } else if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number (e.g., 09XXXXXXXXX)";
    } else {
      return "";
    }
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (!password || !confirmPassword) {
      return ""; // No error when either password field is empty
    }

    return password === confirmPassword ? "" : "Passwords do not match";
  };

  const changeValue = (event, data, validationFunc, setErrorFunc, matchFunc, matchErrorFunc) => {
    const { value } = event.target;
    data(value);

    if (validationFunc && setErrorFunc) {
      const error = validationFunc(value);
      setErrorFunc(error); // Pass setErrorFunc as a parameter
    }

    if (matchFunc && matchErrorFunc) {
      const matchError = matchFunc(value, registerCPass);
      matchErrorFunc(matchError);
    }
  };
  const resetData = () => {
    setFname("");
    setMname("");
    setLname("");
    setAddress("");
    setStreet("");
    setBday("01/01/2023");
    setEmail("");
    setPnum("");
    setPass("");
    setCPass("");
    setGender("");
  };
  //end of onchange per value

  const handleSignUp = async () => {
    const [year, month, day] = registerBday.includes("/")
      ? registerBday.split("/")
      : registerBday.split("-");
    const formattedDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;

    const updatejsondata3 = {
      passwordHash: registerPass,
      email: registerEmail,
      access: "USERS",
    };
    const usertest = await POSTAPI("UserAccount", "addUser", updatejsondata3);

    const updatejsondata2 = {
      address: registerAddress,
      householdHeadId: "",
      totalResidents: 0,
      streets: registerStreet,
    };
    const householdtest = await POSTAPI("Household", "addHousehold", updatejsondata2);

    const updatejsondata = {
      firstName: registerFname,
      middleName: registerMname,
      lastName: registerLname,
      dateOfBirth: formattedDate,
      gender: registerGender,
      phoneNumber: registerPnum,
      email: registerEmail,
      householdId: householdtest.data.id,
      userId: usertest.data.id,
    };
    await POSTAPI("Residents", "addResidents", updatejsondata);

    await Swal.fire("Saved!", "", "success");
    resetData();
  };

  return (
    <SignupLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="First name"
                    fullWidth
                    onChange={(event) => changeValue(event, setFname)}
                    value={registerFname}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Middle name"
                    fullWidth
                    onChange={(event) => changeValue(event, setMname)}
                    value={registerMname}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Last name"
                    fullWidth
                    onChange={(event) => changeValue(event, setLname)}
                    value={registerLname}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    label="Date of Birth"
                    fullWidth
                    onChange={(event) => changeValue(event, setBday)}
                    value={registerBday}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="type"
                    label="Gender"
                    fullWidth
                    onChange={(event) => changeValue(event, setGender)}
                    value={registerGender}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Address"
                    fullWidth
                    onChange={(event) => changeValue(event, setAddress)}
                    value={registerAddress}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Street"
                    fullWidth
                    onChange={(event) => changeValue(event, setStreet)}
                    value={registerStreet}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {/* Email Input */}
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    fullWidth
                    onChange={(event) => changeValue(event, setEmail, validateEmail, setEmailError)}
                    value={registerEmail}
                  />
                  {emailError && (
                    <MDTypography variant="caption" color="error">
                      {emailError}
                    </MDTypography>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Phone Number"
                    fullWidth
                    onChange={(event) =>
                      changeValue(event, setPnum, validatePhoneNumber, setPnumError)
                    }
                    onKeyPress={(event) => {
                      // Allow only numeric characters and backspace
                      const isValidKey = /^[0-9\b]+$/.test(event.key);
                      if (!isValidKey) {
                        event.preventDefault();
                      }
                    }}
                    value={registerPnum}
                  />
                  {pnumError && (
                    <MDTypography variant="caption" color="error">
                      {pnumError}
                    </MDTypography>
                  )}
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    fullWidth
                    onChange={(event) =>
                      changeValue(
                        event,
                        setPass,
                        null,
                        null,
                        validatePasswordMatch,
                        setPasswordMatchError
                      )
                    }
                    value={registerPass}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    onChange={(event) =>
                      changeValue(
                        event,
                        setCPass,
                        null,
                        null,
                        validatePasswordMatch,
                        setPasswordMatchError
                      )
                    }
                    value={registerCPass}
                  />
                  {passwordMatchError && (
                    <MDTypography variant="caption" color="error">
                      {passwordMatchError}
                    </MDTypography>
                  )}
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </SignupLayout>
  );
}
Basic.propTypes = {
  handlingLogin: PropTypes.func,
};
export default Basic;
