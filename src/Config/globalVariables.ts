export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "https://windbackend.herokuapp.com";
export const RUST_API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://windbackend.herokuapp.com";
