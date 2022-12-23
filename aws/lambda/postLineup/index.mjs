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

    const { lineup, userId, playerCount } = event; // TO EDIT

    const queryString = `
    INSERT INTO public.lineup (user_id, player_count, lineup)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, player_count) DO UPDATE
    SET lineup=$3
    RETURNING (user_id, player_count, lineup)
    `;
    const params = [userId, playerCount, lineup];

    const result = await db.query(queryString, params);

    await db.end();

    const response = {
      statusCode: 201,
      headers: {"content-type": "application/json"},
      // body: JSON.stringify(event),
      body: JSON.stringify(result.rows),
    };
    return response;

  } catch (err) {
    console.log('error while trying to connect to db');
  }
};