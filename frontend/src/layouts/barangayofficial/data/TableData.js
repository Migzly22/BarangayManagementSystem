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

import Swal from "sweetalert2";
import { useState, useEffect, useMemo } from "react";

export default function data(datafromdb) {
  const [dbData1, setDbData1] = useState(datafromdb);
  const [rowValues, setRowValues] = useState([{}]);

  useEffect(() => {
    console.log("test", datafromdb.data);
    //setDbData1(datafromdb);
    const residents = datafromdb.data;
    if (residents === null) {
      return;
    }

    const transformedData = residents.map((resident) => ({
      name: (
        <ProfileOfficials
          name={`${resident[0].firstName} ${resident[0].middleName} ${resident[0].lastName}`}
          email={`${resident[0].email}`}
        />
      ),
      address: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {resident[1].address}
        </MDTypography>
      ),
      phonenum: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {resident[0].phoneNumber}
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
    }));

    setRowValues(transformedData);
    setDbData1(datafromdb);
  }, [datafromdb]); // This useEffect runs only once for initialization

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

  let tabledatas = {
    columns: [
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Position", accessor: "position", align: "left" },
      { Header: "Contact #", accessor: "phonenum", align: "center" },
      { Header: "Address", accessor: "address", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rowValues,
  };
  const nodata = {
    columns: [
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Position", accessor: "position", align: "left" },
      { Header: "Contact #", accessor: "phonenum", align: "center" },
      { Header: "Address", accessor: "address", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        name: "-",
        position: "-",
        phonenum: "-",
        address: "-",
        action: "-",
      },
    ],
  };
  return dbData1.data !== null ? tabledatas : nodata;
}
