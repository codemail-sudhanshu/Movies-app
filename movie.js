const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const sbar = document.getElementById("sb");

const suggs = document.getElementById("suggs");

const sbardiv = document.querySelector(".searchbar");

function show() {
  sbardiv.classList.add("sug");
}
function sugremove() {
  sbardiv.classList.remove("sug");
}

sbar.addEventListener("click", function () {
  SEARCH();
});

sbar.addEventListener("keyup", function (event) {
  SEARCH(event);
});

sbar.addEventListener("focusout", function () {
  console.log("blur");
  sugremove();
});

const mc = document.getElementById("mc");

const resp = new XMLHttpRequest();
resp.open("GET", APIURL);
resp.send();
resp.onload = function () {
  const movies = JSON.parse(resp.response).results;
  showmovie(movies);
};

function empty() {
  const empty = document.createElement("div");

  mc.innerText = "";
  empty.classList.add("empty");
  empty.innerText = "No movie found";

  empty.appendChild(document.createElement("br"));
  mc.appendChild(empty);
}

function showmovie(mov) {
  if (mov.length == 0) {
    empty();
  } else {
    const arr = Array.from(mov);
    mc.innerHTML = "";

    arr.forEach((move) => {
      const mbox = document.createElement("div");

      const { poster_path, title, vote_average } = move;
      var ip = IMGPATH + poster_path;

      mbox.classList.add("boxc");
      console.log(poster_path);
      if (poster_path === null) {
        ip = "i.jpg";
      }

      mbox.innerHTML = ` <div class="box">
                <div class="image">
                    <img src="${ip}" class="img" alt="" />
                </div>

                <div class="tistle">
                  ${title}
                    <div class="rating" style="background-color:${getcolor(
                      vote_average
                    )} ;">
        ${vote_average}
            </div>
                </div>
                
            </div>
          

       `;

      mc.appendChild(mbox);
    });
  }
}

function getcolor(num) {
  if (num > 7) return "green";
  else return "orange";
}

function showsuggestion(sg) {
  suggs.innerHTML = "";
  const sgar = Array.from(sg);
  sgar.forEach((sg) => {
    const sugdiv = document.createElement("a");
    sugdiv.classList.add("sg");
    sugdiv.href = "#";
    sugdiv.innerHTML = `${sg.title}`;
    suggs.appendChild(sugdiv);
  });
}

function SEARCH(event) {
  show();
  const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${sbar.value}`;
  const searching = new XMLHttpRequest();
  searching.open("GET", SEARCHAPI);
  searching.send();
  searching.onload = function () {
    const searchval = JSON.parse(searching.response).results;
    var sugar = [];
    sugar = Array.from(searchval);
    showsuggestion(sugar);
    if (sugar.length == 0) {
      const c = document.getElementById("mc");
      empty();
      const sudiv = document.createElement("div");
      sudiv.classList.add("sg");
      sudiv.href = "#";
      sudiv.innerHTML = "No movies found";
      suggs.appendChild(sudiv);
    }

    if (event.key === "Enter") {
      if (sugar.length == 0) {
        empty();
      } else {
        showmovie(sugar);
      }
      sugremove();
    }
  };
}
