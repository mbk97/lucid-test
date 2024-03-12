import axios from "axios";

export const fetchAutocompleteData = async () => {
  const response = await axios.get(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
