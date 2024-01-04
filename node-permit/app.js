const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

const { Permit } = require("permitio");

const permit = new Permit({
  pdp: "https://cloudpdp.api.permit.io",
  token: "YOUR_PERMIT_API_KEY"
});

app.post("/", async (req, res) => {
  // we receive user_id, action & resource
  const { user_id, action, resource } = req.body;

  // error handling
  if (!user_id || !action || !resource) {
    return res.status(404).json({
      status: 404,
      message: "Invalid permission request: missing user_id or action or resource."
    });
  }
  // check here
  const permitted = await permit.check(user_id, action, resource);
  // response
  if (permitted) {
    return res.status(200).json({
      status: 200,
      message: `${user_id} is PERMITTED to ${action} on ${resource}`
    });
  } else {
    res.status(403).json({
      status: 403,
      message: `${user_id} is NOT PERMITTED to ${action} on ${resource}`
    });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}...`);
});