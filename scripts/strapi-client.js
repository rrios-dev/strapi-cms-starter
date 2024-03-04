const axios = require("axios");

const getRoleCredentials = (role) => {
  const roleCredentials = {
    admin: {
      email: process.env.MERMAID_ADMIN_USER_EMAIL,
      password: process.env.MERMAID_ADMIN_USER_PASS,
    },
  };

  const properCredentials = roleCredentials[role];

  if (!properCredentials) throw new Error("Invalid role");

  if (!properCredentials.email || !properCredentials.password)
    throw new Error("Invalid credentials");

  return properCredentials;
};

const strapiClient = async (role) => {
  const instance = axios.create({
    baseURL: `${process.env.HOST}/api`,
  });

  const credentials = getRoleCredentials(role);
  let authToken;

  const authenticate = async () => {
    const response = await instance.post("/auth/local", {
      identifier: credentials.email,
      password: credentials.password,
    });
    authToken = response.data.jwt;
    instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  };

  await authenticate();

  return {
    authenticate,
    instance,
  };
};

module.exports = strapiClient;
