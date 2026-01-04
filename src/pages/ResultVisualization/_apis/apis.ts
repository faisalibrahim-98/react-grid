export const fetchGridData = async () => {
  const iterations = await fetch("http://localhost:5001/api/iterations");

  if (!iterations.ok) {
    throw new Error(`Response status: ${iterations.status}`);
  }

  const json = iterations.json();
  console.log("Fetched grid data:", json);

  return json;
};
