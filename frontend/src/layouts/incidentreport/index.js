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
import documentTableData from "layouts/incidentreport/data/TableData";
import modalTableData from "layouts/incidentreport/data/TableData2";
import { useEffect, useState } from "react";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
import Swal from "sweetalert2";

function ResidentAndHousehold() {
  const [dbData, setDbData] = useState({ data: null });
  const [modalData, setModalData] = useState({ data: null });
  const [searchData, setSearchData] = useState("");
  const [transactionMessage, setTransactionMessage] = useState(null);

  //value container of inputs
  const [textDT, setDT] = useState("01-01-2023T07:11");
  const [textDescription, setDescription] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("On-Session");

  const [ids, setIDS] = useState([]);

  //start of onchange per value
  const reInput = (event, data) => {
    data(event.target.value);
  };
  const resetInputs = () => {
    setSelectedValue("");
    setDT("01-01-2023T07:11");
    setSelectedValue2("On-Session");
    setDescription("");
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
    handleOpenModal("Add Incident");
  };
  const handleOpenModal = (name, jsonData = null, jsonData2 = null) => {
    setModalState(name);
    if (jsonData !== null) {
      var parsedDate = new Date(jsonData.dateTimeOccured);

      // Format the date in the desired format
      var formattedDate =
        parsedDate.getFullYear() +
        "-" +
        ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + parsedDate.getDate()).slice(-2) +
        "T" +
        ("0" + parsedDate.getHours()).slice(-2) +
        ":" +
        ("0" + parsedDate.getMinutes()).slice(-2);

      setSelectedValue(jsonData.residentId);
      setDT(formattedDate);
      setDescription(jsonData.description);
      setSelectedValue2(jsonData.status);

      setTargetID(jsonData.incidentId);
      setIDS([jsonData.incidentId, jsonData.dateReported]);
    }

    setOpenModal(true);
  };

  const handleSavingEdit = async () => {
    handleCloseModal();
    if (!addingMode) {
      await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatejsondata2 = {
            incidentId: ids[0],
            dateReported: ids[1],
            dateTimeOccured: textDT,
            description: textDescription,
            residentId: selectedValue,
            status: selectedValue2,
          };
          console.log(updatejsondata2);
          await PATCHAPI("IncidentReport", "updateReport", updatejsondata2);

          const resultall = await GETAPI("IncidentReport", "showIncidentReports");
          setDbData(resultall);

          await Swal.fire("Saved!", "", "success");
        } else {
          handleOpenModal("Edit User");
        }
      });
    } else {
      const today = new Date();
      const options = { timeZone: "Asia/Tokyo", month: "2-digit", day: "2-digit", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);

      console.log(formattedDate);

      await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatejsondata2 = {
            dateReported: formattedDate,
            dateTimeOccured: textDT,
            description: textDescription,
            residentId: selectedValue,
            status: selectedValue2,
          };
          console.log(updatejsondata2);
          await POSTAPI("IncidentReport", "addReport", updatejsondata2);

          const resultall = await GETAPI("IncidentReport", "showIncidentReports");
          setDbData(resultall);

          await Swal.fire("Saved!", "", "success");
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
      const result = await GETAPI("IncidentReport", "showIncidentReports");
      const resultmodal = await GETAPI("Residents", "showAllResidents");
      setModalData(resultmodal);
      setDbData(result);
    };

    if (dbData.data === null) {
      fetchData();
    }
  }, []); // This useEffect runs only once for initialization

  useEffect(() => {
    const fetchData = async () => {
      const result = await GETAPI("IncidentReport", "showIncidentReports");
      setDbData(result);
      console.log(result);
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
        const result = await DELETEAPI("IncidentReport", `deleteReport?incidentId=${id}`);
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

  const magicSelections = modalTableData(modalData);

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
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Reported By </InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue}
                    label="Select an Option"
                    onChange={(event) => reInput(event, setSelectedValue)}
                    style={{ height: "43px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {magicSelections.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Description"
                  fullWidth
                  onChange={(event) => reInput(event, setDescription)}
                  value={textDescription}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <MDInput
                  type="datetime-local"
                  label="Date and Time of Accident"
                  fullWidth
                  onChange={(event) => reInput(event, setDT)}
                  value={textDT}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Reported By </InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue2}
                    label="Select an Option"
                    onChange={(event) => reInput(event, setSelectedValue2)}
                    style={{ height: "43px" }}
                  >
                    <MenuItem value="On-Session">
                      <em>On-Session</em>
                    </MenuItem>
                    <MenuItem value="Done">
                      <em>Done</em>
                    </MenuItem>
                  </Select>
                </FormControl>
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
                  Incident Reports
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
