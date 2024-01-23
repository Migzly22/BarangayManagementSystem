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

export default function data(datafromdb, { handleEditModal, handlePrint }) {
  const [dbData1, setDbData1] = useState(datafromdb);
  const [rowValues, setRowValues] = useState([{}]);

  const Editbtn = (data, jsondata) => {
    handleEditModal(jsondata);
  };
  const Printbtn = (jsondata) => {
    handlePrint(jsondata);
  };
  useEffect(() => {
    //setDbData1(datafromdb);
    const residents = datafromdb.data;
    console.log(residents);
    if (residents === null) {
      return;
    } else if (residents[0][0] === '{"data": null}') {
      Swal.fire({
        icon: "info",
        text: "Cant find the searched item",
      });
      return;
    }
    const transformedData = residents.map((resident) => {
      const documentInfo = resident[0];
      const residentInfo = resident[1];

      if (!documentInfo || !residentInfo) {
        // Handle the case where either documentInfo or residentInfo is undefined
        return null; // or handle differently based on your requirements
      }

      return {
        idnum: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {documentInfo["documentId"]}
          </MDTypography>
        ),
        documentname: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {documentInfo["documentName"]}
          </MDTypography>
        ),
        name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {`${residentInfo["lastName"]}, ${residentInfo["firstName"]}`}
          </MDTypography>
        ),
        drequest: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {documentInfo["dateRequested"]}
          </MDTypography>
        ),
        drelease: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {documentInfo["dateReleased"]}
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {documentInfo["status"]}
          </MDTypography>
        ),
        action:
          documentInfo["status"] == "Granted" ? (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <Stack spacing={2} direction="row" justifyContent="flex-end">
                <MDButton
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={() => Printbtn(resident)}
                >
                  <Icon fontSize="medium">print</Icon>
                </MDButton>
              </Stack>
            </MDTypography>
          ) : (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <Stack spacing={2} direction="row" justifyContent="flex-end"></Stack>
            </MDTypography>
          ),
      };
    });

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
      { Header: "#", accessor: "idnum", align: "left" },
      { Header: "Document", accessor: "documentname", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Request", accessor: "drequest", align: "left" },
      { Header: "Release", accessor: "drelease", align: "center" },
      { Header: "Status", accessor: "status", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rowValues,
  };
  const nodata = {
    columns: [
      { Header: "#", accessor: "idnum", align: "left" },
      { Header: "Document", accessor: "documentname", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Request", accessor: "drequest", align: "left" },
      { Header: "Release", accessor: "drelease", align: "center" },
      { Header: "Status", accessor: "status", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        idnum: "-",
        documentname: "-",
        name: "-",
        drequest: "-",
        drelease: "-",
        status: "-",
        action: "-",
      },
    ],
  };
  return dbData1.data !== null ? tabledatas : nodata;
}
