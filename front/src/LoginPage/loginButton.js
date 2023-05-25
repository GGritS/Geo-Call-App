export const LoginButton = ({ onClickHandler, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClickHandler}
      className="l_page_login_button"
    >
      GeoCall
    </button>
  );
};
