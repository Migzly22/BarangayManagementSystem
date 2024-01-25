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
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PropTypes from "prop-types";
// Images
import bgImage from "assets/images/BGHALL.jpg";
import logo from "assets/images/logo.png";
import Swal from "sweetalert2";
//Axios
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";

function Basic({ handlingLogin }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  //value container of inputs
  const [loginEmail, setLEmail] = useState("");
  const [loginPassword, setLPassword] = useState("");

  const LoginSubmit = async () => {
    const data = {
      email: loginEmail,
      passwordHash: loginPassword,
      access: "",
    };
    if (!loginEmail || !loginPassword) {
      Swal.fire({
        text: "Please enter both email and password",
        icon: "error",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      Swal.fire({
        text: "Wrong email",
        icon: "error",
      });
      return;
    }

    let enteringresonse = await POSTAPI("UserAccount", "getUserAuth", data);

    if (enteringresonse.data.message === undefined) {
      handlingLogin(enteringresonse.data);
    } else {
      Swal.fire({
        text: "Wrong Password ",
        icon: "error",
      });
    }

    //Reset back the Input Forms
    setLEmail("");
    setLPassword("");
  };

  //start of onchange per value
  const changeEmail = (event) => {
    setLEmail(event.target.value);
  };
  const changePassword = (event) => {
    setLPassword(event.target.value);
  };
  //end of onchange per value

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-4}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <BasicLayout logo={logo}></BasicLayout>
        <MDBox pt={-10} pb={-20} px={3} mt={-64}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={changeEmail}
                value={loginEmail}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
                onChange={changePassword}
                value={loginPassword}
              />
              <MDButton
                variant="text"
                color="info"
                onClick={handleTogglePasswordVisibility}
                sx={{ fontSize: 12, marginTop: 1 }}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </MDButton>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={-1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={LoginSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={2} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
Basic.propTypes = {
  handlingLogin: PropTypes.func,
};
export default Basic;
