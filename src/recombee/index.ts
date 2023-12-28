import recombee from "recombee-api-client";

const rqs = recombee.requests;

const { RECOMBEE_PRIVATE_TOKEN, RECOMBEE_DB, RECOMBEE_REGION } = process.env;
const client = new recombee.ApiClient(RECOMBEE_DB!, RECOMBEE_PRIVATE_TOKEN!, {
  region: RECOMBEE_REGION,
});

export default { client, rqs };
