import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SearchInput = ({ texthandler, textitself }) => {
  const [inputValue, setInputValue] = useState(textitself);
  const [recommendations, setRecommendations] = useState(["Option 1", "Option 2", "Option 3"]);

  const searchingthename = (newValue) => {
    texthandler(newValue);
    setInputValue(newValue);

    // Example: Update recommendations based on the input value
    const updatedRecommendations = getUpdatedRecommendations(newValue);
    setRecommendations(updatedRecommendations);
  };

  const getUpdatedRecommendations = (input) => {
    // Implement your logic to generate updated recommendations based on the input value
    // For example, you can filter the original list or fetch suggestions from an API
    return ["Option 14", "Option 15", "Option 13"];
  };

  return (
    <Autocomplete
      freeSolo
      options={recommendations}
      value={inputValue}
      onChange={(event, newValue) => searchingthename(newValue)}
      renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
    />
  );
};

export default SearchInput;
