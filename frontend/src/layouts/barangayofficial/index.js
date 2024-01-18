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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

import MDButton from "components/MDButton";
// @mui icons
import Icon from "@mui/material/Icon";

// Data
import documentTableData from "layouts/barangayofficial/data/TableData";
import modalTableData from "layouts/barangayofficial/data/TableData2";
import { useEffect, useState } from "react";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
import Swal from "sweetalert2";
import SearchInput from "layouts/barangaydocument/search/index";

function barangayofficial() {
  const helloworld = { data: "123" };
  const [dbData, setDbData] = useState({ data: null });
  const [modalData, setModalData] = useState({ data: null });
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await GETAPI("Officials", "showAllOfficials");
      const resultmodal = await GETAPI("Residents", "showAllResidents");
      setModalData(resultmodal);
      setDbData(result);
    };

    if (dbData.data === null) {
      fetchData();
    }
  }, []); // This useEffect runs only once for initialization

  const SearchFunction = async () => {
    const result = await GETAPI("Residents", `showSearchedItem?customSubstring=${searchData}`);
    setModalData(result);
  };

  //start of onchange per value
  const changeValue = (event, data) => {
    data(event.target.value);
  };
  //end of onchange per value

  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState("");
  //use in changing position of the user
  const [changedPos, setchangedPos] = useState(null);
  const [textitself, settextitself] = useState("");

  const handleOpenModal = async (position, jsonData2) => {
    setchangedPos(jsonData2);
    console.log(jsonData2);
    setOpenModal(true);
    setModalState(position);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    //resetInputs();
  };

  const texthandler = (textval) => {
    settextitself(textval);
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
        await POSTAPI("Documents", "addRequestDocument", datacon);
        const result = await GETAPI("Documents", "getAllRequestDocuments");
        setDbData(result);
        await Swal.fire("Saved!", "", "success");
      }
    });
  };
  const handleChangePos = async (jsonData2) => {
    let neid = textitself.split(":")[0];
    // Use the callback function to access the updated state
    setchangedPos(async (prevChangedPos) => {
      console.log(prevChangedPos);

      // Get the current date
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      let year = currentDate.getFullYear();

      let formattedDate =
        (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day + "/" + year;
      let formattedDate2 =
        (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day + "/" + (year + 1);

      const jsonData = {
        officialId: prevChangedPos.officialId, // Use prevChangedPos instead of changedPos
        residentId: neid,
        position: prevChangedPos.position, // Use prevChangedPos instead of changedPos
        startDate: formattedDate,
        endDate: formattedDate2,
        electedOrAppointed: prevChangedPos.electedOrAppointed,
      };
      ChangeSWAL(jsonData);

      return prevChangedPos; // Return the updated value for the state
    });
  };

  const ChangeSWAL = (data) => {
    handleCloseModal();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PATCHAPI("Officials", "updateOfficials", data);

        const result = await GETAPI("Officials", "showAllOfficials");
        const resultmodal = await GETAPI("Residents", "showAllResidents");
        setModalData(resultmodal);
        setDbData(result);
        await Swal.fire("", "Update Successfully", "success");
      }
    });
  };

  const { columns: modalColumns, rows: modalRows } = modalTableData(modalData, {
    handleChangePos: handleChangePos,
  });
  const Modal12 = (
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
          {modalState}
        </Grid>
        <MDBox py={2} px={3}>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchData}
              onChange={(event) => changeValue(event, setSearchData)}
            />
            <MDButton variant="contained" size="medium" color="success" onClick={SearchFunction}>
              <Icon fontSize="large">search</Icon>
            </MDButton>
          </Stack>
        </MDBox>
        <DataTable
          table={{ columns: modalColumns, rows: modalRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Fade>
  );
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
              <MDBox mb={2}>Edit</MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <MDBox mb={2}>
                <SearchInput
                  texthandler={texthandler}
                  textitself={textitself}
                  modalState={modalState}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid item xs={12} gap={1} mt={2}>
            <Grid container spacing={2} justifyContent={"space-evenly"}>
              <MDButton variant="contained" size="medium" color="success" onClick={handleChangePos}>
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

  const { columns: rColumns, rows: rRows } = documentTableData(dbData, {
    handleOpenModal: handleOpenModal,
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  Officials
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

export default barangayofficial;
