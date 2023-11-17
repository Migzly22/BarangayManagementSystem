import axios from "axios";
/**
 * postData is the request body in json format
 */

const GETAPI = async () => {
  return await axios
    .get(`http://${TARGETLOCALHOST}/${RESTCONTROLLER}/${METHODFUNCTION}`)
    .then(function (response) {
      // Handle the successful response
      console.log("Data:", response.data);
    })
    .catch(function (error) {
      // Handle errors
      console.error("Error:", error);
    });
};

const POSTAPI = async (TARGETLOCALHOST, RESTCONTROLLER, METHODFUNCTION, postData) => {
  return await axios
    .post(`http://${TARGETLOCALHOST}/${RESTCONTROLLER}/${METHODFUNCTION}`, postData)
    .then((response) => {
      // Handle the successful response
      console.log("Post successful. Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

const PATCHAPI = async (postData) => {
  return await axios
    .patch(`http://${TARGETLOCALHOST}/${RESTCONTROLLER}/${METHODFUNCTION}`, postData)
    .then((response) => {
      // Handle the successful response
      console.log("Post successful. Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

const DELETEAPI = async (postData) => {
  return await axios
    .delete(`http://${TARGETLOCALHOST}/${RESTCONTROLLER}/${METHODFUNCTION}`, postData)
    .then((response) => {
      // Handle the successful response
      console.log("Post successful. Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

export { GETAPI, POSTAPI, PATCHAPI, DELETEAPI };
