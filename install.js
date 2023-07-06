let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db3');
let fs = require('fs');

db.run("CREATE TABLE IF NOT EXISTS participants (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_guild_id TEXT, discord_user_id TEXT, discord_user_name TEXT, score INTEGER)");
db.run("CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_guild_id TEXT, winner_participant_id INTEGER, datetime INTEGER)");