let DbAdapter = require('./src/DbAdapter.js');
let ParticipantRepository = require('./src/Repositories/ParticipantRepository');
let GamesRepository = require('./src/Repositories/GamesRepository');
let Game = require('./src/Game');

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../database.db3');

let adapter = new DbAdapter(db);
// let participants = adapter.get("SELECT * FROM participants", {})
//     .then(result => console.log(result));
//
// adapter.get("SELECT * FROM hooligans")
//     .catch(reject => {
//         console.log(reject)
//     })
//console.log(participants);

let repository = new ParticipantRepository(adapter);
let gamesRepository = new GamesRepository(adapter);

// repository.IsParticipantExists(1, 1).then(result => {
//     console.log(result)
// });
// repository.IsParticipantExists("207169330549358592", "207912188407578624").then(result => {
//     console.log(result)
// });

// repository.AddParticipant(123, 123, "test");

// repository.GetRandomParticipant(1243).then(r => console.log(r));

let game = new Game(adapter, repository, gamesRepository);

// game.CanStartGame(123).then(r => console.log(r)).catch(reject => console.log(reject));

game.Run("644645112692867073").then(r => console.log(r)).catch(r => console.log(r));

let now = new Date(2021, 1, 2, 14, 30, 0);
let prev = gameWithDate(2021, 1, 1, 14, 29, 59);

function gameWithDate(year, month, date, hours, minutes, seconds) {
    let dt = new Date(year, month, date, hours, minutes, seconds);
    return {
        datetime: Math.floor(dt / 1000)
    }
}

test('can start first game', () => {
    expect(game.canStartGame(null, now)).toBe(true);
})

test('24 hours passed', () => {
    expect(game.canStartGame(prev, now)).toBe(true);
})

test('next day before 9am', () => {
    let now = new Date(2021, 1, 2, 8, 59, 59);
    expect(game.canStartGame(prev, now)).toBe(false);
})

test('next day after 9am', () => {
    let now = new Date(2021, 1, 2, 9, 0, 1);
    expect(game.canStartGame(prev, now)).toBe(true);
})

test('same day', () => {
    let prev = gameWithDate(2021, 1, 2, 1, 0, 1);
    let now = new Date(2021, 1, 2, 10, 0, 1);
    expect(game.canStartGame(prev, now)).toBe(false);
})
