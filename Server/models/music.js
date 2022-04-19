let musics = [
  {
    songId: 1,
    title: "Sathi",
    url: "https://www.youtube.com/watch?v=7aoDZ8UeUxU",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: new Date(2019, 1, 31),
  },

  {
    songId: 2,
    title: "Risaune Bhaya",
    url: "https://www.youtube.com/watch?v=UkK5ofiKxgg",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: new Date(2022, 3, 21),
  },
];

let counter = musics[musics.length - 1].songId;

module.exports = class Music {
  constructor(songId, title, url, genre, artist, releaseDate) {
    this.songId = songId;
    this.title = title;
    this.url = url;
    this.genre = genre;
    this.artist = artist;
    this.releaseDate = releaseDate;
  }
  save() {
    const index = musics.findIndex((music) => (music.songId = this.songId));
    if (index >= 0) {
      musics.splice(index, 1, this);
    } else {
      counter++;
      this.songId = counter;
      musics.push(this);
    }
  }

  update() {
    const index = musics.findIndex((music) => (music.songId = this.songId));
    if (index > -1) {
      books.splice(index, 1, this);
      return this;
    } else {
      throw new Error("Not Found");
    }
  }

  static gets() {
    return musics;
  }

  static findMusicById(songId) {
    const index = musics.findIndex((music) => music.songId == songId);
    if (index >= 0) {
      return musics[index];
    } else {
      throw new Error("Not Found");
    }
  }
  static remove(songId) {
    const index = musics.findIndex((music) => music.songId == songId);
    if (index >= 0) {
      musics = musics.filter((music) => music.songId != songId);
    } else {
      throw new Error("Not Found");
    }
  }
};