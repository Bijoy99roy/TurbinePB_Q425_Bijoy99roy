export function getEnvironmentBaseApi() {
  console.log(import.meta.env.VITE_ENVIRONMENT);
  return import.meta.env.VITE_ENVIRONMENT === "PROD"
    ? ""
    : "http://localhost:3000";
}