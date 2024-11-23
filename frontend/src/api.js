import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

// Fetch partners
export const fetchPartners = async () => {
  const response = await axios.get(`${API_URL}/partners`);
  return response.data;
};

// Delete partner
export const deletePartner = async (id) => {
  const response = await axios.delete(`${API_URL}/partners/${id}`);
  return response.data;
};

// Update partner
export const updatePartner = async (id, data) => {
  const response = await axios.put(`${API_URL}/partners/${id}`, data);
  return response.data;
};

// Create partner
export const createPartner = async (data) => {
  const response = await axios.post(`${API_URL}/partners`, data, {
    headers: {
      "Content-Type": "application/json", // Ensure content type is JSON
    },
  });
  return response.data;
};
