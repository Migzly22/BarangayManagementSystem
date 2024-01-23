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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [data1, setdata1] = useState(0);
  const [data2, setdata2] = useState(0);
  const [data3, setdata3] = useState(0);
  const [data4, setdata4] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result1 = await GETAPI("Dashboard", "request");
      setdata1(result1.data[0][0]);
      const result2 = await GETAPI("Dashboard", "incident");
      setdata2(result2.data[0][0]);
      const result3 = await GETAPI("Dashboard", "residents");
      setdata3(result3.data[0][0]);
      const result4 = await GETAPI("Dashboard", "getAllRequestDocuments");
      setdata4(result4.data);
      //const result4 = await GETAPI("Dashboard", "todaydocument");
      //setdata4(result4);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data1);
  }, [data1]);
  useEffect(() => {
    console.log(data2);
  }, [data2]);
  useEffect(() => {
    console.log(data3);
  }, [data3]);
  useEffect(() => {
    console.log(data4);
  }, [data4]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Document Request"
                count={data1}
                percentage={{}}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Today's Incident"
                count={data2}
                percentage={{}}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Residents"
                count={data3}
                percentage={{}}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
