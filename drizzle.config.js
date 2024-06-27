/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-Mock-Interview_owner:Kuodc7VAWxO0@ep-noisy-feather-a5z3im22.us-east-2.aws.neon.tech/AI-Mock-Interview?sslmode=require',
    }
  };