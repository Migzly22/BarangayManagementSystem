import axios from "axios";
/**
 * postData is the request body in json format
 */

const GETAPI = async (RESTCONTROLLER, METHODFUNCTION, postData = "") => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/${RESTCONTROLLER}/${METHODFUNCTION}${postData}`)
    .then(function (response) {
      // Handle the successful response
      return response.json();
    })
    .catch(function (error) {
      // Handle errors
      console.error("Error:", error);
    });
};

const POSTAPI = async (RESTCONTROLLER, METHODFUNCTION, postData) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/${RESTCONTROLLER}/${METHODFUNCTION}`, postData)
    .then((response) => {
      // Handle the successful response
      return response.json();
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

const PATCHAPI = async (RESTCONTROLLER, METHODFUNCTION, postData) => {
  return await axios
    .patch(`${process.env.REACT_APP_API_URL}/${RESTCONTROLLER}/${METHODFUNCTION}`, postData)
    .then((response) => {
      // Handle the successful response
      return response.json();
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

const DELETEAPI = async (RESTCONTROLLER, METHODFUNCTION, postData = "") => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/${RESTCONTROLLER}/${METHODFUNCTION}${postData}`)
    .then((response) => {
      // Handle the successful response
      return response.json();
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

export { GETAPI, POSTAPI, PATCHAPI, DELETEAPI };
