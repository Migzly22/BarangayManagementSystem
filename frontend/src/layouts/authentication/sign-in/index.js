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
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//Axios
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";

function Basic({ handlingLogin }) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  //value container of inputs
  const [loginEmail, setLEmail] = useState("");
  const [loginPassword, setLPassword] = useState("");

  const handlingDatafromAPI = () => {
    const postdata = {};
    fetch("http://192.168.18.108:9090/UserAccount/showAllUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json());
          console.log("Data posted successfully");
        } else {
          console.error("Failed to post data");
        }
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };
  const handlingDatafromAPI2 = () => {
    fetch("http://192.168.18.108:9090/UserAccount/showAllUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Return the parsed JSON data
        return response.json();
      })
      .then((data) => {
        // Handle the fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const LoginSubmit = async () => {
    handlingDatafromAPI2();
    const data = {
      email: loginEmail,
      password: loginPassword,
    };

    //code here related to API and Session
    let example1 = "admin";
    let example2 = "pass";
    if (loginEmail === example1 && loginPassword === example2) {
      handlingLogin(data);
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
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
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
                type="password"
                label="Password"
                fullWidth
                onChange={changePassword}
                value={loginPassword}
              />
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
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={LoginSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
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
