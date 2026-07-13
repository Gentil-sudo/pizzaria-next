const { Client } = require("pg");

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  console.log("Conectado com sucesso!");
  await client.end();
}

main().catch(console.error);