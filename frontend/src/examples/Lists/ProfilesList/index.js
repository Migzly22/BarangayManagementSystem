/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
import Swal from "sweetalert2";

function ProfilesList({ title, profiles, ID, shadow }) {
  async function Change(val) {
    console.log(val);
    if (val === "Emai") {
      Swal.fire({
        title: "Enter your email",
        input: "email",
        inputPlaceholder: "Enter your email address",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter your email!";
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Handle the email submission here
          const enteredEmail = result.value;
          let jsondata = {
            userId: ID,
            email: enteredEmail,
          };
          await PATCHAPI("UserAccount", "updateEmail", jsondata);
          Swal.fire({
            icon: "success",
            text: "Updated Successfully",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Enter your password",
        html:
          '<input type="password" id="password" class="swal2-input" placeholder="Password">' +
          '<input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">',
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const password = document.getElementById("password").value;
          const confirmPassword = document.getElementById("confirmPassword").value;

          // Password criteria validation using regex
          const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

          if (!passwordRegex.test(password)) {
            Swal.showValidationMessage(
              "Password should be at least 8 characters long, contain at least 1 capital letter, and at least 1 small letter"
            );
          } else if (password !== confirmPassword) {
            Swal.showValidationMessage("Passwords do not match");
          } else {
            // Password is valid
            return { password: password, confirmPassword: confirmPassword };
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Handle the password submission here
          const enteredPassword = result.value.password;
          let jsondata = {
            userId: ID,
            passwordHash: enteredPassword,
          };
          await PATCHAPI("UserAccount", "updatePassword", jsondata);
          await Swal.fire({
            icon: "success",
            text: "Updated Successfully",
          });
        }
      });
    }
  }
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <MDBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar src={image} alt="something here" shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {description}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        {action.type === "internal" ? (
          <MDButton component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </MDButton>
        ) : (
          <MDButton variant="text" color={action.color} onClick={() => Change(action.TobeChange)}>
            {action.label}
          </MDButton>
        )}
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
