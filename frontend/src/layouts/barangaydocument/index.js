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
import documentTableData from "layouts/barangaydocument/data/TableData";
import SearchInput from "layouts/barangaydocument/search/index";
import { useEffect, useState } from "react";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
import Swal from "sweetalert2";

import Autocomplete from "@mui/material/Autocomplete";
//import pretempTemplate from "layouts/barangaydocument/input.docx";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import textti from "layouts/barangaydocument/test.txt";

function ResidentAndHousehold() {
  const [dbData, setDbData] = useState({ data: null });
  const [searchData, setSearchData] = useState("");
  const [transactionMessage, setTransactionMessage] = useState(null);

  const [selectedValue2, setSelectedValue2] = useState("Pending");
  const [nameUSer, setnameUser] = useState("");
  const [textitself, settextitself] = useState("");

  const [ids, setIDS] = useState([]);

  //start of onchange per value
  const reInput = (event, data) => {
    data(event.target.value);
  };
  const resetInputs = () => {
    setSelectedValue2("");
    setIDS([]);
  };

  //end of onchange per value

  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState(null);

  const [editModal, setEditModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [targetID, setTargetID] = useState(null);
  const [addingMode, setAddingMode] = useState(false);

  const addNewResident = () => {
    handleOpenModal();
  };

  const handleEditModal = (jsonData = null) => {
    setSelectedValue(jsonData);
    setSelectedValue2(jsonData[0]["status"]);
    setEditModal(true);
  };

  //TEXT DOCS
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    fetch("./BClear1.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => setDoc(new Uint8Array(buffer)))
      .catch((error) => console.error("Error loading template", error));
  }, []);

  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww", doc);
  }, [doc]);

  const generateDocument = (name) => {};
  //TEXT
  const handlePrint = async (jsonData = null) => {
    //generateDocument("JohnDoe");
    const Docxtemplater = require("docxtemplater");

    // Load the DOCX file content (assuming 'insert.docx' is in the public folder)
    let gest = fetch("./insert.docx")
      .then((response) => response)
      .catch((error) => {
        console.error("Error fetching or processing the DOCX file:", error);
      });
    try {
      const zip = new PizZip(doc);
      const docx = new Docxtemplater(zip);

      // Replace placeholders in the template with dynamic data
      docx.setData({
        NAME: "ioioio",
        AGE: "2234",
        GENDER: "2234",
        ADDRESS: "2234",
        DATETODAY: "2234",
      });

      // Render the document
      console.log("Before rendering");
      docx.render();
      console.log("After rendering");

      // Get the modified document as a buffer
      const updatedDocBuffer = docx.getZip().generate({ type: "uint8array" });

      // Save the updated document with a new name
      saveAs(new Blob([updatedDocBuffer]), `${name}_document.docx`);
    } catch (error) {
      console.error("Error generating document", error);
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleSavingEdit = async () => {
    handleCloseModal();
    const today = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Tokyo" };
    const formatter = new Intl.DateTimeFormat("en-CA", options);

    const formattedDate = formatter.format(today);

    await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatejsondata = {
          documentId: selectedValue[0]["documentId"],
          dateReleased: formattedDate,
          status: selectedValue2,
        };

        await PATCHAPI("Documents", "updateRequestDocument", updatejsondata);
        const result = await GETAPI("Documents", "getAllRequestDocuments");
        setDbData(result);

        await Swal.fire("Saved!", "", "success");
      } else {
        handleEditModal();
      }
    });
  };

  const handleSaving = async () => {
    handleCloseModal();
    let neid = textitself.split(":")[0];
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;
    const datacon = {
      dateReleased: "",
      dateRequested: formattedDate,
      documentName: selectedValue2,
      documentType: "DOCX",
      residentId: neid,
      status: "Pending",
    };

    await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(123);
        await POSTAPI("Documents", "addRequestDocument", datacon);
        const result = await GETAPI("Documents", "getAllRequestDocuments");
        setDbData(result);
        await Swal.fire("Saved!", "", "success");
      }
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setAddingMode(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await GETAPI("Documents", "getAllRequestDocuments");
      setDbData(result);
    };

    if (dbData.data === null) {
      fetchData();
    }
  }, []); // This useEffect runs only once for initialization

  useEffect(() => {
    const fetchData = async () => {
      const result = await GETAPI("Documents", "getAllRequestDocuments");
      setDbData(result);
    };
    if (transactionMessage != null && transactionMessage.data.icon == "success") {
      fetchData();
      setTransactionMessage(null);
    }
  }, [transactionMessage]); // This useEffect runs whenever dbData changes

  const SearchFunction = async () => {
    const result = await GETAPI("Documents", `showSearchedItem?customSubstring=${searchData}`);
    setDbData(result);
  };

  //start of onchange per value
  const changeValue = (event, data) => {
    data(event.target.value);
  };
  //end of onchange per value

  const { columns: rColumns, rows: rRows } = documentTableData(dbData, {
    handleEditModal: handleEditModal,
    handlePrint: handlePrint,
  });

  const ModalEdit = (
    <Fade in={editModal}>
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
              <MDBox mb={2}>Edit</MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Status </InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue2}
                    label="Select an Option"
                    onChange={(event) => reInput(event, setSelectedValue2)}
                    style={{ height: "43px" }}
                  >
                    <MenuItem value="Pending">
                      <em>Pending</em>
                    </MenuItem>
                    <MenuItem value="Granted">
                      <em>Granted</em>
                    </MenuItem>
                    <MenuItem value="Decline">
                      <em>Decline</em>
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
                Update
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

  const texthandler = (textval) => {
    settextitself(textval);
  };
  const ModalAdd = (
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
              <MDBox mb={2}>Request Document</MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Requested Document </InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue2}
                    label="Select an Option"
                    onChange={(event) => reInput(event, setSelectedValue2)}
                    style={{ height: "43px" }}
                  >
                    <MenuItem value="Barangay Indigency">
                      <em>Barangay Indigency</em>
                    </MenuItem>
                    <MenuItem value="Barangay Clearance">
                      <em>Barangay Clearance</em>
                    </MenuItem>
                    <MenuItem value="Certificate of Recidency">
                      <em>Certificate of Recidency</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <SearchInput texthandler={texthandler} textitself={textitself} />
              </MDBox>
            </Grid>
          </Grid>
          <Grid item xs={12} gap={1} mt={2}>
            <Grid container spacing={2} justifyContent={"space-evenly"}>
              <MDButton variant="contained" size="medium" color="success" onClick={handleSaving}>
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
        open={editModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {ModalEdit}
      </Modal>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {ModalAdd}
      </Modal>
    </DashboardLayout>
  );
}

export default ResidentAndHousehold;
