import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

await pool.query(`
INSERT INTO users
(username,password,display_name,role,department,lang,theme)
VALUES
('employee','Demo123!','Employee','employee','HR','en','dark'),
('manager','Demo123!','Manager','manager','Management','en','dark'),
('executive','Demo123!','Executive','executive','Executive','en','dark'),
('admin','Demo123!','Administrator','admin','IT','en','dark')
ON CONFLICT (username) DO NOTHING;
`);

console.log("Users inserted successfully.");

await pool.end();