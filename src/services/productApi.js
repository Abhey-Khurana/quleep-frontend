import axios from "axios";
import { API_BASE } from "../config.js";

export const getProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};
