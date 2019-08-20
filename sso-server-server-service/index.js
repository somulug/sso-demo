const app = require("./app");
const PORT = 8020;

app.listen(PORT, () => {
  console.info(`sso-server listening on port ${PORT}`);
});
