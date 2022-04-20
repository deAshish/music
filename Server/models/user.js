const Music = require("./music");
let users = [
  {
    userId: 1,
    sessionId: "",
    firstName: "Ashish",
    lastName: "Ghimire",
    userName: "deAshish",
    password: "12345",
    userSong: [],
  },
  {
    userId: 2,
    sessionId: "",
    firstName: "Sachin",
    lastName: "Tandan",
    userName: "sachin",
    password: "12345",
    userSong: [],
  },
];
let counter = users[users.length - 1].userId;

module.exports = class User {
  constructor(sessionId, firstName, lastName, userName, password) {
    this.sessionId = sessionId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }

  save() {
    const index = users.findIndex((user) => (user.userId = this.userId));
    if (index >= 0) {
      users.splice(index, 1, this);
    } else {
      counter++;
      this.userId = counter;
      users.push(this);
    }
  }

  update() {
    const index = users.findIndex((user) => user.id == this.id);
    if (index > -1) {
      users.splice(index, 1, this);
      return this;
    } else {
      throw new Error("NOT Found");
    }
  }

  static getKey() {
    return counter;
  }

  static gets() {
    return users;
  }

  static getById(userId) {
    return users.find((user) => user.userId == userId);
  }

  static remove(userId) {
    const index = users.findIndex((user) => user.userId == userId);
    if (index >= 0) {
      users = users.filter((user) => user.userId != userId);
      return users;
    } else {
      throw new Error("Record not found.");
    }
  }

  static getBySessionId(sessionId) {
    return users.find((user) => user.sessionId == sessionId);
  }

  static getAuthenticatedUser(userName, password) {
    const index = users.findIndex(
      (user) =>
        user.userName.toLowerCase() == userName.toLowerCase() &&
        user.password.toLowerCase() == password.toLowerCase()
    );

    if (index >= 0) {
      const user = users.find(
        (user) =>
          user.userName.toLowerCase() == userName.toLowerCase() &&
          user.password.toLowerCase() == password.toLowerCase()
      );

      const sessionId = user.lastName + "-" + Math.floor(Math.random() * 1000);

      const index = users.findIndex((user) => user.userId == user.userId);
      user.sessionId = sessionId;
      users.splice(index, 1, user);
      return { sessionNumber: sessionId };
    } else {
      throw new Error("Failed to login.");
    }
  }

  static getSongs(sessionId) {
    const user = users.find((user) => user.sessionId == sessionId);

    if (user != undefined) {
      const songs = user.userSong.map((x) => x.songId);
      return Music.gets().filter((x) => songs.includes(x.songId));
    }
  }

  static enqueueSong(sessionId, songId) {
    const user = users.find((user) => user.sessionId == sessionId);

    if (user == null || user == undefined) {
      throw new Error("User not found!");
    } else {
      const song = user.userSong.find((s) => s.songId == songId);
      if (song == null || song == undefined) {
        user.userSong.push({ songId: songId });
      }
      let songsList = user.userSong.map((x) => x.songId);
      return Music.gets().filter((x) => songsList.includes(x.songId));
    }
  }
  static dequeueSong(sessionId, songId) {
    const user = users.find((user) => user.sessionId == sessionId);
    console.log(user);
    if (user == null || user == undefined) {
      throw new Error("User not found.");
    } else {
      user.userSong = user.userSong.filter((s) => s.songId != songId);
      let songsList = user.userSong.map((x) => x.songId);
      return Music.gets().filter((x) => songsList.includes(x.songId));
    }
  }
};
