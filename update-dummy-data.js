const mysql = require('mysql2/promise');

async function updateData() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Resetting all stage_data to clean (no incidents)...");
    await connection.execute(`UPDATE stage_data SET stage1 = 0, stage2 = 0, stage3 = 0`);

    console.log("Selecting 6 rides to escalate...");
    const [rides] = await connection.execute(`SELECT ride_id FROM stage_data LIMIT 6`);
    
    if (rides.length >= 1) {
      console.log(`Escalating ride ${rides[0].ride_id} to Stage 3 (SOS Triggered)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1, stage2 = 1, stage3 = 1 WHERE ride_id = ?`, [rides[0].ride_id]);
    }
    if (rides.length >= 2) {
      console.log(`Escalating ride ${rides[1].ride_id} to Stage 2 (Video Anomaly)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1, stage2 = 1 WHERE ride_id = ?`, [rides[1].ride_id]);
    }
    if (rides.length >= 3) {
      console.log(`Escalating ride ${rides[2].ride_id} to Stage 1 (Audio Threshold)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1 WHERE ride_id = ?`, [rides[2].ride_id]);
    }
    if (rides.length >= 4) {
      console.log(`Escalating ride ${rides[3].ride_id} to Stage 3 (SOS Triggered)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1, stage2 = 1, stage3 = 1 WHERE ride_id = ?`, [rides[3].ride_id]);
    }
    if (rides.length >= 5) {
      console.log(`Escalating ride ${rides[4].ride_id} to Stage 2 (Video Anomaly)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1, stage2 = 1 WHERE ride_id = ?`, [rides[4].ride_id]);
    }
    if (rides.length >= 6) {
      console.log(`Escalating ride ${rides[5].ride_id} to Stage 1 (Audio Threshold)`);
      await connection.execute(`UPDATE stage_data SET stage1 = 1 WHERE ride_id = ?`, [rides[5].ride_id]);
    }

    console.log("Data updated successfully!");
  } catch (err) {
    console.error("Error updating data:", err);
  } finally {
    await connection.end();
  }
}

updateData();
