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

// Images
import email from "assets/images/USER.png";
import pass from "assets/images/pass.png";
import marie from "assets/images/marie.jpg";
import ivana from "assets/images/ivana-square.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default [
  {
    image: email,
    name: "Email",
    description: "Change Email",
    action: {
      type: "action",
      route: "",
      color: "info",
      label: "Change",
      TobeChange: "Emai",
    },
  },
  {
    image: pass,
    name: "Password",
    description: "Change your Password",
    action: {
      type: "action",
      route: "",
      color: "info",
      label: "Change",
      TobeChange: "Password",
    },
  },
];
