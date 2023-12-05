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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

import MDButton from "components/MDButton";
// @mui icons
import Icon from "@mui/material/Icon";

// Data
import documentTableData from "layouts/residentandhousehold/data/TableData";
import { useEffect, useState } from "react";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";

function ResidentAndHousehold() {
  const helloworld = { data: "123" };
  const [dbData, setDbData] = useState({ data: null });
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await GETAPI("Residents", "showAllResidents");
      setDbData(result);
    };

    if (dbData.data === null) {
      fetchData();
    }
  }, []); // This useEffect runs only once for initialization

  useEffect(() => {
    console.log(dbData.data);
  }, [dbData]); // This useEffect runs whenever dbData changes

  const SearchFunction = async () => {
    console.log("hello");
    const result = await GETAPI("Residents", `showSearchedItem?customSubstring=${searchData}`);
    console.log(result);
    setDbData(result);
  };

  //start of onchange per value
  const changeValue = (event, data) => {
    data(event.target.value);
  };
  //end of onchange per value

  const { columns: rColumns, rows: rRows } = documentTableData(dbData, SearchFunction);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox py={2} px={3}>
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    value={searchData}
                    onChange={(event) => changeValue(event, setSearchData)}
                  />
                  <MDButton
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={SearchFunction}
                  >
                    <Icon fontSize="large">search</Icon>
                  </MDButton>
                  <MDButton variant="contained" size="medium" color="success">
                    <Icon fontSize="large">add</Icon>
                  </MDButton>
                </Stack>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Residents
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: rColumns, rows: rRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ResidentAndHousehold;
