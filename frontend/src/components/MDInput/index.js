import { forwardRef } from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const MDInput = forwardRef(({ error, helperText, ...props }, ref) => {
  return (
    <FormControl fullWidth error={error}>
      <TextField {...props} ref={ref} />
      {error && (
        <InputAdornment position="end" style={{ position: "absolute", top: 0 }}>
          <ErrorOutlineIcon color="error" />
        </InputAdornment>
      )}
      {helperText && (
        <div
          style={{
            color: emailValidation.error ? "#f44336" : "#333", // Adjust color based on error
            fontSize: "0.75rem",
            marginTop: "4px",
            marginLeft: "14px", // Adjust this value to your preference
          }}
        >
          {helperText}
        </div>
      )}
    </FormControl>
  );
});

MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDInput;
