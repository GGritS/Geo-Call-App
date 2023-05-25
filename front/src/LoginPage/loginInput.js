export const LoginInput = ({ userName, setUserName }) => {
  const handleValueChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <input
      value={userName}
      onChange={handleValueChange}
      className="l_page_input"
    />
  );
};
