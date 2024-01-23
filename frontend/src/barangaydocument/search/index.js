import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GETAPI, POSTAPI, PATCHAPI, DELETEAPI } from "axiosfunctions";
import Swal from "sweetalert2";

const SearchInput = ({ texthandler, textitself }) => {
  const [inputValue, setInputValue] = useState(textitself);
  const [recommendations, setRecommendations] = useState([]);

  const searchingthename = async (newValue) => {
    texthandler(newValue);
    setInputValue(newValue);

    const updatedRecommendations = await getUpdatedRecommendations(newValue);
    // Example: Update recommendations based on the input value

    if (newValue && newValue.length >= 3) {
      setRecommendations(updatedRecommendations);
    } else {
      setRecommendations([]);
    }
  };

  const getUpdatedRecommendations = async (input) => {
    try {
      console.log(input);

      // Assuming GETAPI returns a promise
      const result = await GETAPI("Residents", `showSearchedItem2?customSubstring=${input}`);

      // Destructure the result directly to get the 'data' property
      const { data } = result;

      // Use map to transform the data array into the desired format
      const NAMECONTAINERS = data
        ? data[0].map((person) => {
            const { residentId, firstName, lastName } = person;
            return `${residentId}: ${firstName} ${lastName}`;
          })
        : [];

      return NAMECONTAINERS;
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      throw error; // You might want to handle errors appropriately in your application
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={recommendations}
      value={inputValue}
      onChange={(event, newValue) => searchingthename(newValue)}
      renderInput={(params) => <TextField {...params} label="Resident Name" variant="outlined" />}
    />
  );
};

export default SearchInput;
