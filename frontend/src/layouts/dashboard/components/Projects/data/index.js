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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Swal from "sweetalert2";
import { useState, useEffect, useMemo } from "react";
export default function data(dbData1) {
  //const [dbData1, setDbData1] = useState(datafromdb);
  const [rowValues, setRowValues] = useState([{}]);
  let tabledatas = {
    columns: [
      { Header: "Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Document", accessor: "documentname", align: "center" },
    ],

    rows: rowValues,
  };

  useEffect(() => {
    //setDbData1(datafromdb);
    const residents = dbData1.data;
    if (residents === null) {
      return;
    } else if (residents[0][0] === '{"data": null}') {
      Swal.fire({
        icon: "info",
        text: "Cant find the searched item",
      });
      return;
    }
    console.log(residents);
    const transformedData = residents.map((resident) => ({
      name: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {`${resident[1].firstName} ${resident[1].middleName} ${resident[1].lastName}`}
        </MDTypography>
      ),
      documentname: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {`${resident[0].documentName}`}
        </MDTypography>
      ),
    }));

    setRowValues(transformedData);
    //setDbData1(dbData1);
  }, [dbData1]); // This useEffect runs only once for initialization
  const nodata = {
    columns: [
      { Header: "Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Document", accessor: "documentname", align: "center" },
    ],

    rows: [
      {
        name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            -
          </MDTypography>
        ),
        documentname: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            -
          </MDTypography>
        ),
      },
    ],
  };
  return dbData1.data !== null ? tabledatas : nodata;
}
