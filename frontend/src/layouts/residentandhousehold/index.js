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

import { Modal, Backdrop, Fade } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

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
import Swal from "sweetalert2";

function ResidentAndHousehold() {
  const helloworld = { data: "123" };
  const [dbData, setDbData] = useState({ data: null });
  const [searchData, setSearchData] = useState("");
  const [transactionMessage, setTransactionMessage] = useState(null);

  //value container of inputs
  const [textFname, setFname] = useState("");
  const [textMname, setMname] = useState("");
  const [textLname, setLname] = useState("");
  const [textAddress, setAddress] = useState("");
  const [textStreet, setStreet] = useState("");
  const [textBday, setBday] = useState("01/01/2023");
  const [textEmail, setEmail] = useState("");
  const [textPnum, setPnum] = useState("");
  const [textGender, setGender] = useState("");

  //start of onchange per value
  const reInput = (event, data) => {
    data(event.target.value);
    console.log(event.target.value);
  };
  const resetInputs = () => {
    setFname("");
    setMname("");
    setLname("");
    setAddress("");
    setStreet("");
    setBday("01/01/2023");
    setEmail("");
    setPnum("");
    setGender("");
  };

  //end of onchange per value

  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [targetID, setTargetID] = useState(null);

  const handleOpenModal = (name, jsonData = null, jsonData2 = null) => {
    setModalState(name);
    if (jsonData !== null) {
      setFname(jsonData.firstName);
      setMname(jsonData.middleName);
      setLname(jsonData.lastName);
      setAddress(jsonData2.address);
      setStreet(jsonData2.street);
      setBday(jsonData.dateOfBirth);
      setEmail(jsonData.email);
      setPnum(jsonData.phoneNumber);
      setGender(jsonData.gender);
      setTargetID(jsonData.userId);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetInputs();
  };

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
    const fetchData = async () => {
      const result = await GETAPI("Residents", "showAllResidents");
      setDbData(result);
    };
    if (transactionMessage != null && transactionMessage.data.icon == "success") {
      fetchData();
      setTransactionMessage(null);
    }
  }, [transactionMessage]); // This useEffect runs whenever dbData changes

  const SearchFunction = async () => {
    const result = await GETAPI("Residents", `showSearchedItem?customSubstring=${searchData}`);
    setDbData(result);
  };

  const handlingDelete = async (id, name) => {
    await Swal.fire({
      title: `Do you want to remove ${name}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await DELETEAPI("Residents", `deleteResident?residentId=${id}`);
        console.log(result);
        setTransactionMessage(result);
        Swal.fire("Deleted Successfully!", "", "success");
      }
    });
  };
  //start of onchange per value
  const changeValue = (event, data) => {
    data(event.target.value);
  };
  //end of onchange per value

  const { columns: rColumns, rows: rRows } = documentTableData(dbData, {
    handlingDelete1: handlingDelete,
    handleOpenModal: handleOpenModal,
  });

  const Modal1 = (
    <Fade in={openModal}>
      <MDBox
        sx={{
          width: "50vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2} gap={0.5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>{modalState}</MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="First name"
                  fullWidth
                  onChange={(event) => reInput(event, setFname)}
                  value={textFname}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Middle name"
                  fullWidth
                  onChange={(event) => reInput(event, setMname)}
                  value={textMname}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Last name"
                  fullWidth
                  onChange={(event) => reInput(event, setLname)}
                  value={textLname}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Address"
                  fullWidth
                  onChange={(event) => reInput(event, setAddress)}
                  value={textAddress}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Street"
                  fullWidth
                  onChange={(event) => reInput(event, setStreet)}
                  value={textStreet}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date of Birth"
                  fullWidth
                  onChange={(event) => reInput(event, setBday)}
                  value={textBday}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Gender"
                  fullWidth
                  onChange={(event) => reInput(event, setGender)}
                  value={textGender}
                />
              </MDBox>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  fullWidth
                  onChange={(event) => reInput(event, setEmail)}
                  value={textEmail}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Phone Number"
                  fullWidth
                  onChange={(event) => reInput(event, setPnum)}
                  value={textPnum}
                />
              </MDBox>
            </Grid>
          </Grid>

          <Grid item xs={12} gap={1} mt={2}>
            <Grid container spacing={2} justifyContent={"space-evenly"}>
              <MDButton variant="contained" size="medium" color="success">
                Add
              </MDButton>
              <MDButton variant="contained" size="medium" color="error" onClick={handleCloseModal}>
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Fade>
  );

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
                  <MDButton
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={() => {
                      handleOpenModal("Add User");
                    }}
                  >
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {Modal1}
      </Modal>
    </DashboardLayout>
  );
}

export default ResidentAndHousehold;
