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
    //setDbData1(datafromdb);
    const residents = datafromdb.data;
    console.log(residents);
    if (residents === null) {
      return;
    }

    const transformedData = residents.map((resident) => ({
      value: `${resident[0].residentId}`,
      label: `${resident[0].firstName} ${resident[0].lastName}`,
    }));

    setRowValues(transformedData);
    console.log(rowValues);
    setDbData1(datafromdb);
  }, [datafromdb]); // This useEffect runs only once for initialization

  const nodata = [{ value: "", label: "None" }];
  return dbData1.data !== null ? rowValues : nodata;
}
