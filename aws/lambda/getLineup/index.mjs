import pkg from 'pg';
const { Client } = pkg;

export const handler = async (event, context) => {
  try {
    const user = process.env.USER || '';
    const host = process.env.DB_ENDPOINT_ADDRESS || '';
    console.log(`host:${host}`);
    const database = process.env.DB_NAME || '';
    const password = process.env.PASSWORD || '';
    const port = process.env.PORT || '';

    const db = new Client({
      user,
      host,
      database,
      password,
      port,
    });
    await db.connect();

    const { userId, playerCount } = event;

    const queryString = `
    SELECT * FROM public.lineup
    WHERE user_id=$1 AND player_count=$2
    `;
    const params = [userId, playerCount];

    const result = await db.query(queryString, params);

    await db.end();

    const response = {
      statusCode: 200,
      headers: {"content-type": "application/json"},
      body: JSON.stringify(result.rows[0]),
      // body: JSON.stringify(event),
    };
    return response;

  } catch (err) {
    console.log('error while trying to connect to db');
  }
};