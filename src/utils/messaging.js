const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports.message = async (params) => {
  const result = await client.messages.create({
    body: params.body,
    from: "+15034449655",
    to: params.to,
  });
  return result;
};
