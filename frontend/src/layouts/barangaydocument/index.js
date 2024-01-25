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
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    fetch("./BClear1.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => setDoc(new Uint8Array(buffer)))
      .catch((error) => console.error("Error loading template", error));
    fetch("./BClear2.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => setDoc1(new Uint8Array(buffer)))
      .catch((error) => console.error("Error loading template", error));
    fetch("./BClear3.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => setDoc2(new Uint8Array(buffer)))
      .catch((error) => console.error("Error loading template", error));
  }, []);

  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww", doc);
  }, [doc]);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww21", doc2);
  }, [doc2]);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww1", doc1);
  }, [doc1]);

  const [d1, setd1] = useState(false);
  const [d2, setd2] = useState(false);
  const [d3, setd3] = useState(false);

  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww1", doc);
    console.log("gwww1", d1);
    const Docxtemplater = require("docxtemplater");
    try {
      const zip = new PizZip(doc);
      const docx = new Docxtemplater(zip);

      // Replace placeholders in the template with dynamic data

      docx.setData(d1);

      // Render the document
      docx.render();

      // Get the modified document as a buffer
      const updatedDocBuffer = docx.getZip().generate({ type: "uint8array" });

      // Save the updated document with a new name
      saveAs(new Blob([updatedDocBuffer]), `BarangayDocument.docx`);
    } catch (error) {
      console.error("Error generating document", error);
    }
  }, [d1]);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww1", doc1);
    console.log("gwww1", d2);
    const Docxtemplater = require("docxtemplater");
    try {
      const zip = new PizZip(doc1);
      const docx = new Docxtemplater(zip);

      // Replace placeholders in the template with dynamic data

      docx.setData(d2);

      // Render the document
      docx.render();

      // Get the modified document as a buffer
      const updatedDocBuffer = docx.getZip().generate({ type: "uint8array" });

      // Save the updated document with a new name
      saveAs(new Blob([updatedDocBuffer]), `BarangayDocument.docx`);
    } catch (error) {
      console.error("Error generating document", error);
    }
  }, [d2]);
  useEffect(() => {
    // Load your .docx template (you may need to adjust the path)
    console.log("gwww1", doc2);
    console.log("gwww1", d3);
    const Docxtemplater = require("docxtemplater");
    try {
      const zip = new PizZip(doc2);
      const docx = new Docxtemplater(zip);

      // Replace placeholders in the template with dynamic data

      docx.setData(d3);

      // Render the document
      docx.render();

      // Get the modified document as a buffer
      const updatedDocBuffer = docx.getZip().generate({ type: "uint8array" });

      // Save the updated document with a new name
      saveAs(new Blob([updatedDocBuffer]), `BarangayDocument.docx`);
    } catch (error) {
      console.error("Error generating document", error);
    }
  }, [d3]);

  const handlePrint = (jsonData = null) => {
    // Load the DOCX file content (assuming 'insert.docx' is in the public folder)

    var birthdate = new Date(jsonData[1]["dateOfBirth"]);
    var currentDate = new Date();

    // Calculate the difference in years
    var age = currentDate.getFullYear() - birthdate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() &&
        currentDate.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();

    let data32 = {};
    var formattedDate = month + "/" + day + "/" + year;
    let heaven = "";

    switch (jsonData[0]["documentName"]) {
      case "Barangay Clearance":
        data32 = {
          NAME: `${jsonData[1]["firstName"]} ${jsonData[1]["middleName"]} ${jsonData[1]["lastName"]}`,
          AGE: age,
          GENDER: jsonData[1]["gender"],
          ADDRESS: jsonData[2]["address"],
          DATETODAY: formattedDate,
        };
        setd1(data32);
        break;
      case "Certificate of Recidency":
        data32 = {
          NAME: `${jsonData[1]["firstName"]} ${jsonData[1]["middleName"]} ${jsonData[1]["lastName"]}`,
          AGE: age,
          ADDRESS: jsonData[2]["address"],
          DATETODAY: formattedDate,
        };
        setd2(data32);
        break;
      case "Barangay Indigency":
        data32 = {
          NAME: `${jsonData[1]["firstName"]} ${jsonData[1]["middleName"]} ${jsonData[1]["lastName"]}`,
          BIRTHDATE: age,
          ADDRESS: jsonData[2]["address"],
        };
        setd3(data32);
        break;
    }
    /*
    try {
      const zip = new PizZip(heaven);
      const docx = new Docxtemplater(zip);

      // Replace placeholders in the template with dynamic data

      docx.setData(data32);

      // Render the document
      docx.render();

      // Get the modified document as a buffer
      const updatedDocBuffer = docx.getZip().generate({ type: "uint8array" });

      // Save the updated document with a new name
      saveAs(new Blob([updatedDocBuffer]), `BarangayDocument.docx`);
    } catch (error) {
      console.error("Error generating document", error);
    }
    */
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
      }
    });
  };

  const handleSaving = async () => {
    handleCloseModal();
    if (textitself === "" || selectedValue2 === "") {
      await Swal.fire("Error!", "Requirements is unfilled. Please fillup.", "error");
      return;
    }
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
