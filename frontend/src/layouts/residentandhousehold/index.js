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

import { Modal, Backdrop, Fade, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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
  const [textBday, setBday] = useState("01/01/2024");
  const [textEmail, setEmail] = useState("");
  const [textPnum, setPnum] = useState("");
  const [textGender, setGender] = useState("Male");

  const [ids, setIDS] = useState([]);

  //start of onchange per value
  const reInput = (event, data) => {
    data(event.target.value);
  };
  const resetInputs = () => {
    setFname("");
    setMname("");
    setLname("");
    setAddress("");
    setStreet("");
    setBday("2024/01/01");
    setEmail("");
    setPnum("");
    setGender("Male");
    setIDS([]);
  };

  //end of onchange per value

  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [targetID, setTargetID] = useState(null);
  const [addingMode, setAddingMode] = useState(false);

  const addNewResident = () => {
    resetInputs();
    setAddingMode(true);
    handleOpenModal("Add User");
  };
  const handleOpenModal = (name, jsonData = null, jsonData2 = null) => {
    setModalState(name);
    console.log(jsonData);
    console.log(jsonData2);

    if (jsonData !== null) {
      const [month, day, year] = jsonData.dateOfBirth.includes("/")
        ? jsonData.dateOfBirth.split("/")
        : jsonData.dateOfBirth.split("-");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      setBday(formattedDate);

      setFname(jsonData.firstName);
      setMname(jsonData.middleName);
      setLname(jsonData.lastName);
      setAddress(jsonData2.address);
      setStreet(jsonData2.streets);
      setEmail(jsonData.email);
      setPnum(jsonData.phoneNumber);
      setGender(jsonData.gender);
      setTargetID(jsonData.userId);
      setIDS([
        jsonData.residentId,
        jsonData2.householdId,
        jsonData2.householdHeadId,
        jsonData2.totalResidents,
      ]);
    }

    setOpenModal(true);
  };

  const handleSavingEdit = async () => {
    handleCloseModal();
    if (
      textFname === "" ||
      textMname === "" ||
      textLname === "" ||
      textAddress === "" ||
      textStreet === "" ||
      textEmail === "" ||
      textPnum === "" ||
      textGender === ""
    ) {
      // Display SweetAlert indicating that the user should fill in the required information
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the required information before adding a resident!",
      });
      return;
    }
    const pattern = /^\d{11}$/;
    if (!pattern.test(textPnum)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Numbers only in phone number",
      });
      return;
    }

    if (!addingMode) {
      const [year, month, day] = textBday.includes("/") ? textBday.split("/") : textBday.split("-");
      const formattedDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;

      await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatejsondata = {
            dateOfBirth: formattedDate,
            email: textEmail,
            firstName: textFname,
            gender: textGender,
            householdId: ids[1],
            lastName: textLname,
            middleName: textMname,
            phoneNumber: textPnum,
            residentId: ids[0],
            userId: null,
          };
          const updatejsondata2 = {
            address: textAddress,
            householdHeadId: ids[2],
            householdId: ids[1],
            streets: textStreet,
            totalResidents: ids[3],
          };
          await PATCHAPI("Residents", "updateResident", updatejsondata);
          await PATCHAPI("Household", "updateHousehold", updatejsondata2);
          const resultall = await GETAPI("Residents", "showAllResidents");
          setDbData(resultall);
          //const result2 = await PATCHAPI("Residents", "showAllResidents");

          await Swal.fire("Saved!", "", "success");
        } else {
          handleOpenModal("Edit User");
        }
      });
    } else {
      console.log("adding");
      const [year, month, day] = textBday.includes("/") ? textBday.split("/") : textBday.split("-");
      const formattedDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;

      await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatejsondata2 = {
            address: textAddress,
            householdHeadId: "",
            totalResidents: 0,
            streets: textStreet,
          };
          const householdtest = await POSTAPI("Household", "addHousehold", updatejsondata2);

          const updatejsondata = {
            firstName: textFname,
            middleName: textMname,
            lastName: textLname,
            dateOfBirth: formattedDate,
            gender: textGender,
            phoneNumber: textPnum,
            email: textEmail,
            householdId: householdtest.data.id,
          };
          await POSTAPI("Residents", "addResidents", updatejsondata);

          const resultall = await GETAPI("Residents", "showAllResidents");
          setDbData(resultall);

          await Swal.fire("Saved!", "", "success");
        } else {
          handleOpenModal("Edit User");
        }
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setAddingMode(false);
    //resetInputs();
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

  const handlePhoneNumberChange = (event) => {
    // Set a maximum length for the phone number (e.g., 10 characters)
    const maxLength = 11;

    // Get the input value
    let inputValue = event.target.value;

    // Trim any whitespace
    inputValue = inputValue.trim();

    // Check if the input length exceeds the maximum length
    if (inputValue.length > maxLength) {
      // If it exceeds, truncate the input
      inputValue = inputValue.slice(0, maxLength);
    }
  };

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
                <FormControl fullWidth>
                  <InputLabel id="select-label">Gender</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label="Select an Option"
                    onChange={(event) => reInput(event, setGender)}
                    value={textGender}
                    style={{ height: "43px" }}
                  >
                    <MenuItem value="Male">
                      <em>Male</em>
                    </MenuItem>
                    <MenuItem value="Female">
                      <em>Female</em>
                    </MenuItem>
                  </Select>
                </FormControl>
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
              <MDButton
                variant="contained"
                size="medium"
                color="success"
                onClick={handleSavingEdit}
              >
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
                    onClick={addNewResident}
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
