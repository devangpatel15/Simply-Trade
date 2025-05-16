// Simulated device image API — replace with a real API when available
export const getDeviceImage = async (brand, model) => {
  const searchTerm = `${brand} ${model}`.toLowerCase();

  if (searchTerm.includes("samsung")) {
    return "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg";
  } else if (searchTerm.includes("iphone") || searchTerm.includes("apple")) {
    return "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg";
  } else {
    return null; // fallback to default image
  }
};
