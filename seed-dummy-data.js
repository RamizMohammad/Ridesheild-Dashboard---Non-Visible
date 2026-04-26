const mysql = require('mysql2/promise');

const LOCATIONS = [
  { name: "Connaught Place, New Delhi", lat: 28.6329, lon: 77.2195 },
  { name: "India Gate, New Delhi", lat: 28.6129, lon: 77.2295 },
  { name: "Hauz Khas, New Delhi", lat: 28.5494, lon: 77.2001 },
  { name: "Saket, New Delhi", lat: 28.5245, lon: 77.2066 },
  { name: "Vasant Kunj, New Delhi", lat: 28.5292, lon: 77.1541 },
  { name: "Gurugram Cyber Hub", lat: 28.4950, lon: 77.0895 },
  { name: "Noida Sector 18", lat: 28.5708, lon: 77.3208 },
  { name: "Lajpat Nagar, New Delhi", lat: 28.5683, lon: 77.2433 },
  { name: "Karol Bagh, New Delhi", lat: 28.6515, lon: 77.1901 },
  { name: "Dwarka Sector 21", lat: 28.5523, lon: 77.0583 }
];

const NAMES = ["Rahul", "Amit", "Priya", "Neha", "Vikas", "Suresh", "Pooja", "Arun", "Kavita", "Ramesh", "Deepak", "Sneha", "Anil", "Meena", "Sanjay"];
const SURNAMES = ["Sharma", "Verma", "Singh", "Kumar", "Gupta", "Mishra", "Patel", "Das", "Jain", "Reddy", "Yadav", "Chauhan"];

function getRandomName() {
  const f = NAMES[Math.floor(Math.random() * NAMES.length)];
  const s = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
  return `${f} ${s}`;
}

function getRandomPhone() {
  let p = "9";
  for (let i = 0; i < 9; i++) p += Math.floor(Math.random() * 10);
  return p;
}

function getRandomDate(daysBack = 30) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return d;
}

function formatDateForSQL(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function seed() {
  console.log("Connecting to Database...");
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Adding 10 Dummy Users...");
    const userIds = [];
    for (let i = 0; i < 10; i++) {
      const name = getRandomName();
      const mobile = getRandomPhone();
      const [res] = await connection.execute(
        `INSERT INTO users (name, mobile, usertype) VALUES (?, ?, 'customer')`,
        [name, mobile]
      );
      userIds.push(res.insertId);
    }

    console.log("Adding 10 Dummy Drivers...");
    const driverIds = [];
    for (let i = 0; i < 10; i++) {
      const name = getRandomName();
      const mobile = getRandomPhone();
      const isOnline = Math.random() > 0.5 ? 1 : 0;
      const ridingStatus = isOnline ? 'available' : 'offline';
      const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      
      const [res] = await connection.execute(
        `INSERT INTO drivers (name, mobile, isOnline, ridingStatus, current_lat, current_lon) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, mobile, isOnline, ridingStatus, loc.lat, loc.lon]
      );
      driverIds.push(res.insertId);
    }

    console.log("Adding 40 Historical Rides (Completed / Cancelled)...");
    let completedCount = 0;
    for (let i = 0; i < 40; i++) {
      const uid = userIds[Math.floor(Math.random() * userIds.length)];
      const did = driverIds[Math.floor(Math.random() * driverIds.length)];
      
      const pIdx = Math.floor(Math.random() * LOCATIONS.length);
      let dIdx = Math.floor(Math.random() * LOCATIONS.length);
      while (dIdx === pIdx) dIdx = Math.floor(Math.random() * LOCATIONS.length);
      
      const pLoc = LOCATIONS[pIdx];
      const dLoc = LOCATIONS[dIdx];
      
      const distance = (Math.random() * 15 + 2).toFixed(2); // 2 to 17 km
      const fare = (distance * 15 + Math.random() * 20).toFixed(2); // Rough formula
      
      const isCompleted = Math.random() > 0.2; // 80% completed
      const status = isCompleted ? 'completed' : 'cancelled';
      
      const reqDate = getRandomDate(30);
      const accDate = new Date(reqDate.getTime() + (Math.random() * 5 + 1) * 60000); // +1 to 6 mins
      const startDate = new Date(accDate.getTime() + (Math.random() * 5 + 2) * 60000); // +2 to 7 mins
      const compDate = new Date(startDate.getTime() + (distance * 3 + Math.random() * 10) * 60000); // ride duration
      
      const [res] = await connection.execute(
        `INSERT INTO rides (pickLoc, dropLoc, pickLat, pickLon, dropLat, dropLon, fare, status, distance, userid, driverid, requested_at, accepted_at, started_at, completed_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pLoc.name, dLoc.name, pLoc.lat, pLoc.lon, dLoc.lat, dLoc.lon, fare, status, distance, uid, did,
          formatDateForSQL(reqDate), 
          formatDateForSQL(accDate), 
          isCompleted ? formatDateForSQL(startDate) : null, 
          isCompleted ? formatDateForSQL(compDate) : null
        ]
      );
      
      const rideId = res.insertId;
      
      // Add stage data
      if (isCompleted) {
        await connection.execute(
          `INSERT INTO stage_data (ride_id, stage0, stage1, stage2, stage3) VALUES (?, 1, 1, 1, 1)`,
          [rideId]
        );
        completedCount++;
      } else {
        await connection.execute(
          `INSERT INTO stage_data (ride_id, stage0, stage1, stage2, stage3) VALUES (?, 1, 0, 0, 0)`,
          [rideId]
        );
      }
    }
    
    console.log(`Successfully added 10 users, 10 drivers, and 40 past rides (${completedCount} completed). Active rides were NOT touched.`);

  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    await connection.end();
  }
}

seed();
