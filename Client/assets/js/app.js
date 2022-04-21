let sessionId = 0;

init();

function init() {
  sessionId = sessionStorage.getItem("sessionId");

  if (sessionId != 0 && sessionId != null) {
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("logout-panel").style.display = "inline";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("main").style.display = "inline";
    fetchSongs();
    fetchByLoginId();
  } else {
    document.getElementById("login-panel").style.display = "flex";
    document.getElementById("logout-panel").style.display = "none";
    document.getElementById("welcome").style.display = "flex";
    document.getElementById("main").style.display = "none";
  }
}

document.getElementById("logout").addEventListener("click", (event) => {
  sessionStorage.removeItem("sessionId");
  stopPlayback();
  init();
});

document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault(); //Prevent form's default behivour

  fetch("http://localhost:3000/users/authenticate", {
    method: "POST",

    body: JSON.stringify({
      userName: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.sessionNumber == "Failed to login.") {
        alert(res.sessionNumber);
      } else {
        sessionId = res.sessionNumber;
        sessionStorage.setItem("sessionId", sessionId);
        init();
      }
    })
    .catch((err) => {
      alert("err");
    });
});

//fetch the song
function fetchSongs() {
  fetch("http://localhost:3000/musics/")
    .then((res) => res.json())
    .then((res) => {
      dataInSongList(res);
      refreshSongList();
    });
}
const dataInSongList = (data) => {
  let htmlString = "";
  if (data.Error == "Record not found.") {
    alert(data.Error);
  } else {
    data.forEach((x) => {
      htmlString += " <tr>";
      htmlString += `<td>${x.songId}</td>`;
      htmlString += `<td>${x.title}</td>`;
      htmlString += `<td>${x.genre}</td>`;
      htmlString += `<td>${x.artist.firstName} ${x.artist.lastName}</td>`;
      htmlString += `<td>${x.releaseDate}</td>`;
      htmlString += ` <td style="text-align:center;"><span><i tag="${x.songId}" class="fa fa-plus queue"></i></span></td>`;
      htmlString += "</tr>";
    });
  }
  document.getElementById("table-body").innerHTML = htmlString;
};

function fetchSongsBySession() {
  fetch(
    "http://localhost:3000/users/getSongs/" +
      sessionStorage.getItem("sessionId")
  )
    .then((res) => res.json())
    .then((res) => {
      dataInPlayList(res);
    });
}

const dataInPlayList = (data) => {
  let htmlString = "";
  if (data.Error == "Record not found.") {
    alert(data.Error);
  } else {
    data.forEach((x) => {
      htmlString += " <tr>";
      htmlString += `<td>${x.songId}</td>`;
      htmlString += `<td>${x.title}</td>`;
      htmlString += `<td>${x.genre}</td>`;
      htmlString += `<td>${x.artist.firstName} ${x.artist.lastName}</td>`;
      htmlString += `<td>${x.releaseDate}</td>`;
      htmlString += `<td style="text-align:center;"><span>
                       <i tag="${x.songId}" class="fa fa-minus dequeue"></i>
                      <i tag="${x.songId}" class="fa fa-play playSong"></i>
                       </span></td>`;
      htmlString += "</tr>";
    });
  }
  document.getElementById("playList-Table").innerHTML = htmlString;
};

//Action listner for search
document.getElementById("btn-search").addEventListener("click", () => {
  fetch(
    "http://localhost:3000/musics/search?title=" +
      document.getElementById("txt-search").value
  )
    .then((res) => res.json())
    .then((res) => {
      dataInSongList(res);
      //refreshSongList();
    });
});

//refresh event binding of song list
function refreshSongList() {
  let btns = document.getElementsByClassName("queue");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      enqueue(this.getAttribute("tag"));
    });
  });
}

//refresh event binding of playlist
function refreshPlayListSong() {
  let btns = document.getElementsByClassName("dequeue");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      dequeue(this.getAttribute("tag"));
    });
  });
}

//function to enqueue the songs
const enqueue = function (songId) {
  fetch("http://localhost:3000/users/enqueueSong", {
    method: "POST",
    body: JSON.stringify({
      sessionId: sessionStorage.getItem("sessionId"),
      songId: parseInt(songId),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      loadSongsInPlayer(res);
      dataInPlayList(res);
      refreshPlayListSong();
      refreshPlayListForPlayerEvent();
    });
};

function fetchByLoginId() {
  fetch(
    "http://localhost:3000/users/getSongs/" +
      sessionStorage.getItem("sessionId")
  )
    .then((res) => res.json())
    .then((res) => {
      loadSongsInPlayer(res);
      dataInPlayList(res);
      refreshPlayListSong();
      refreshPlayListForPlayerEvent();
    });
}

//song to play from here
const playFromHere = (songId) => {
  startPlayingFromHere(songId);
};

//function to deque the songs
const dequeue = function (songId) {
  fetch("http://localhost:3000/users/dequeueSong", {
    method: "POST",
    body: JSON.stringify({
      sessionId: sessionStorage.getItem("sessionId"),
      songId: parseInt(songId),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      removeFromCurrentPlayer(songId);
      dataInPlayList(res);
      refreshPlayListSong();
      refreshPlayListForPlayerEvent();
    });
};

function refreshPlayListForPlayerEvent() {
  let btns = document.getElementsByClassName("playSong");
  Array.prototype.forEach.call(btns, function addClickListener(btn) {
    btn.addEventListener("click", function (event) {
      playFromHere(this.getAttribute("tag"));
    });
  });
}
