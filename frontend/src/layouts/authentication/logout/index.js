import PropTypes from "prop-types";

function Basic({ handlingLogout }) {
  handlingLogout();

  return true;
}
Basic.propTypes = {
  handlingLogout: PropTypes.func,
};
export default Basic;
