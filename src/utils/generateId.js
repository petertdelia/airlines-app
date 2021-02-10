const generateId = (() => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
})();

export default generateId;