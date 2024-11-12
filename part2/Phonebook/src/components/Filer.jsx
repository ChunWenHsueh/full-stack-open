const Filer = ({ search, setSearch }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <p>
      filer shown with <input value={search} onChange={handleSearchChange} />
    </p>
  );
};

export default Filer;
