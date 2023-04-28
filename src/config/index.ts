const environmentVariables = {
  USER: import.meta.env.VITE_USER || "",
  PASSWORD: import.meta.env.VITE_PASSWORD || "",
  TOKEN: import.meta.env.VITE_TOKEN || "",
};

export default environmentVariables;
