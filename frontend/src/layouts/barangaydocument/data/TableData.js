/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Button from "@mui/material/Button";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import Stack from "@mui/material/Stack";
// @mui icons
import Icon from "@mui/material/Icon";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const ProfileOfficials = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "#", accessor: "idnum", align: "left" },
      { Header: "Document", accessor: "documentname", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Date of Request", accessor: "drequest", align: "left" },
      { Header: "Date of Release", accessor: "drelease", align: "center" },
      { Header: "Status", accessor: "status", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        idnum: <Job title="1" />,
        documentname: <Job title="Manager" />,
        name: <ProfileOfficials name="John Michael" email="john@creative-tim.com" />,
        drequest: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            09999999999
          </MDTypography>
        ),
        drelease: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            09999999999
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Requesting
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <MDButton variant="contained" size="medium" color="info">
                <Icon fontSize="large">edit</Icon>
              </MDButton>
              <MDButton variant="contained" size="medium" color="error">
                <Icon fontSize="medium">delete</Icon>
              </MDButton>
            </Stack>
          </MDTypography>
        ),
      },
    ],
  };
}
