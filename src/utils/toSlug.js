export default str => {
  return str
    .toLowerCase()
    .replace(/\s/g, "_")
    .replace(/\W/g, "");
};
