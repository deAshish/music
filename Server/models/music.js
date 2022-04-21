let musics = [
  {
    songId: 1,
    title: "Formula Fantasy",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/FormulaFantasy.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
  },

  {
    songId: 2,
    title: "La Re Compensa",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/LaRecompensa.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
  },
  {
    songId: 3,
    title: "Guilt",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/Guilt.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
  },
  {
    songId: 4,
    title: "Hangout",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/Hangout.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
  },
  {
    songId: 5,
    title: "Director",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/Director.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
  },
  {
    songId: 6,
    title: "MOMENTITO",
    url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/MOMENTITO.mp3",
    genre: "Country",
    artist: {
      artistId: 1,
      firstName: "Sushant",
      lastName: "KC",
    },
    releaseDate: "2019-01-31",
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

  static search(title) {
    return musics.filter((x) =>
      x.title.toUpperCase().includes(title.toUpperCase())
    );
  }

  static findMusicById(songId) {
    const index = musics.findIndex((music) => music.songId == songId);
    if (index >= 0) {
      return musics[index];
    } else {
      throw new Error("Not Found");
    }
  }

  // static songByUser(sessionId) {
  //   const songs = User.getBySessionId(sessionId).playSong.map((x) => x.songId);
  //   console.log(songs);
  //   return musics.filter((x) => songs.includes(x.songId));
  // }

  static remove(songId) {
    const index = musics.findIndex((music) => music.songId == songId);
    if (index >= 0) {
      musics = musics.filter((music) => music.songId != songId);
    } else {
      throw new Error("Not Found");
    }
  }
};
