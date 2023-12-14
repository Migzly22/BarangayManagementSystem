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
  const [registerPnum, setPnum] = useState("");
  const [registerPass, setPass] = useState("");
  const [registerCPass, setCPass] = useState("");
  const [registerGender, setGender] = useState("");

  //start of onchange per value
  const changeValue = (event, data) => {
    data(event.target.value);
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
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    fullWidth
                    onChange={(event) => changeValue(event, setEmail)}
                    value={registerEmail}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Phone Number"
                    fullWidth
                    onChange={(event) => changeValue(event, setPnum)}
                    value={registerPnum}
                  />
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
                    onChange={(event) => changeValue(event, setPass)}
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
                    onChange={(event) => changeValue(event, setCPass)}
                    value={registerCPass}
                  />
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
