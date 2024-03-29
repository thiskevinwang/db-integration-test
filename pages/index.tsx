// import { runMigrations } from "../db/postgres/run-migrations";
import { pool } from "../db/postgres/pool";

export default function IndexPage({ data, integrationApiResponse }: any) {
  return (
    <div>
      <h1>Hi</h1>
      <main>{data && JSON.stringify(data)}</main>
      <hr />
      <main>
        {integrationApiResponse && JSON.stringify(integrationApiResponse)}
      </main>
    </div>
  );
}

// docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword --rm -d postgres

export async function getStaticProps() {
  console.log(
    "Fetching data from integration API...",
    process.env.INTEGRATIONS_API_URL
  );
  const res = await fetch(`${process.env.INTEGRATIONS_API_URL}/organizations`);
  const integrationApiResponse = await res.json();

  // await runMigrations("../db/postgres/migrations");
  const client = await pool.connect();
  const result = await client.query("SELECT NOW()");
  return {
    props: {
      data: result.rows[0].now.toISOString(),
      integrationApiResponse,
    },
  };
}
