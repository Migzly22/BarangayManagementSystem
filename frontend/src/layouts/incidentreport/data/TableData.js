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

import Swal from "sweetalert2";
import { useState, useEffect, useMemo } from "react";

export default function data(datafromdb, { handlingDelete1, handleOpenModal }) {
  const [dbData1, setDbData1] = useState(datafromdb);
  const [rowValues, setRowValues] = useState([{}]);

  const Deletebtn = (data, name) => {
    handlingDelete1(data, name);
  };
  const Editbtn = (data, jsondata, jsondata2) => {
    handleOpenModal(data, jsondata, jsondata2);
  };
  useEffect(() => {
    //setDbData1(datafromdb);
    const residents = datafromdb.data;
    console.log(residents);
    if (residents === null) {
      return;
    }

    const transformedData = residents.map((resident) => ({
      reportedname: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {`${resident[1].firstName} ${resident[1].lastName}`}
        </MDTypography>
      ),
      description: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {resident[0].description}
        </MDTypography>
      ),
      dreport: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {resident[0].dateReported}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {resident[0].status}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <MDButton
              variant="contained"
              size="medium"
              color="info"
              onClick={() => Editbtn("Edit", resident[0], resident[1])}
            >
              <Icon fontSize="large">edit</Icon>
            </MDButton>
            <MDButton
              variant="contained"
              size="medium"
              color="error"
              onClick={() =>
                Deletebtn(
                  resident[0].incidentId,
                  `${resident[1].firstName} ${resident[1].middleName} ${resident[1].lastName}`
                )
              }
            >
              <Icon fontSize="medium">delete</Icon>
            </MDButton>
          </Stack>
        </MDTypography>
      ),
    }));

    setRowValues(transformedData);
    setDbData1(datafromdb);
  }, [datafromdb]); // This useEffect runs only once for initialization

  let tabledatas = {
    columns: [
      { Header: "Reported by ", accessor: "reportedname", align: "left" },
      { Header: "Incident", accessor: "description", align: "left" },
      { Header: "Date Reported", accessor: "dreport", align: "left" },
      { Header: "Status", accessor: "status", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rowValues,
  };
  const nodata = {
    columns: [
      { Header: "Reported by ", accessor: "reportedname", align: "left" },
      { Header: "Incident", accessor: "description", align: "left" },
      { Header: "Date Reported", accessor: "dreport", align: "left" },
      { Header: "Status", accessor: "status", width: "100px", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        name: "-",
        address: "-",
        phonenum: "-",
        action: "-",
      },
    ],
  };
  return dbData1.data !== null ? tabledatas : nodata;
}
