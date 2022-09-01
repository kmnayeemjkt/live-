var video = document.querySelector(".video");
var bar = document.querySelector(".orange-bar");
var juice = document.querySelector(".orange-juice");
var btn = document.getElementById("play-pause");
var time = document.getElementById("time");
var c = document.querySelector(".c-video");
fullscreenbtn = document.getElementById("fullscreenbtn");
var range = document.getElementById("timeplay");
var bubble = document.getElementById("bubble");
var timeout;
var valueHover = 0;
function togglePlayPause() {
  if (video.paused) {
    btn.className = "pause";
    video.play();
  } else {
    btn.className = "play";
    video.pause();
  }
}
function toggleIconPlayPause() {
  if (video.paused) {
    btn.className = "pause";
  } else {
    btn.className = "play";
  }
}
function scrollVideo(curtime) {
  video.currentTime = curtime;
  range.value = curtime;
  console.log(curtime);
  var juicePos = curtime / video.duration;
  document.getElementById("timeplay").style.backgroundImage =
    "linear-gradient(90deg,#dd2c00 " +
    juicePos * 100 +
    "%, rgba(255, 255, 255, 0.2) " +
    (100 % -(juicePos * 100)) +
    "%)";
}
function toggleFullScreen() {
  if (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
  ) {
    if (document.documentElement.requestFullScreen) {
      c.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      c.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
function calcSliderPos(e) {
  return (
    (e.offsetX / e.target.clientWidth) *
    parseInt(e.target.getAttribute("max"), 10)
  );
}
// code check event click on video to play or pause video
video.addEventListener("click", function () {
  togglePlayPause();
});
// code check event click button play or pause to play or pause video
btn.onclick = function () {
  togglePlayPause();
};
// code check event video play to update timebar
video.addEventListener("timeupdate", function () {
  var juicePos = video.currentTime / video.duration;
  if (video.ended) {
    btn.className = "play";
  }
  document.getElementById("timeplay").style.backgroundImage =
    "linear-gradient(90deg,#dd2c00 " +
    juicePos * 100 +
    "%, rgba(255, 255, 255, 0.2) " +
    (100 % -(juicePos * 100)) +
    "%)";
});


// code set max input range by duration video
$(document).ready(function () {
	  video.currentTime = 4
	toggleIconPlayPause()
  document.getElementById("vol").style.backgroundImage =
    "linear-gradient(90deg,#dd2c00 " +
    100 +
    "%, rgba(255, 255, 255, 0.2) " +
    0 +
    "%)";
});
$(function () {});
setInterval(function () {
  var sd = parseInt(video.duration % 60);
  var md = parseInt((video.duration / 60) % 60);
  var s = parseInt(video.currentTime % 60);
  var m = parseInt((video.currentTime / 60) % 60);
  $("#timeplay").attr({
    max: video.duration,
  });
  $("#time").html(m + ":" + s + " / " + md + ":" + sd);
  document.getElementById("timeplay").value = video.currentTime;
}, 500);
// code check event click button fullscreen to make video fullscreen
fullscreenbtn.addEventListener("click", toggleFullScreen, false);
// code check input volume change to + or - volume video
$("#vol").on("input change", (e) => {
  var volume = (document.getElementById("vol").value = `${e.target.value}`);
  console.log(volume);

  document.getElementById("vol").style.backgroundImage =
    "linear-gradient(90deg,#dd2c00 " +
    volume +
    "%, rgba(255, 255, 255, 0.2) " +
    (100 % -volume) +
    "%)";

  video.volume = volume / 100;
});
// code check event mouse not move to hide controls
document.onmousemove = function () {
  var ct = document.querySelector(".controls");
  ct.classList.remove("onmousemove");
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    ct.classList.add("onmousemove");
  }, 3000);
};
// code check event mouseout timebar to hidden bubbletime
document.getElementById("timeplay").addEventListener("mouseout", function (e) {
  bubble.style.visibility = "hidden";
});
// code check event mouseout timebar to show bubbletime
document.getElementById("timeplay").addEventListener("mousemove", function (e) {
  valueHover = calcSliderPos(e).toFixed(2);
  var s = parseInt(valueHover % 60);
  var m = parseInt((valueHover / 60) % 60);
  bubble.innerHTML = m + ":" + s;
  var offset = $("#timeplay").offset();
  var x = e.pageX - offset.left;
  bubble.style.left = x + "px";
  bubble.style.visibility = "visible";
});
$("#timeplay").on("input change", (e) => {
  video.currentTime = e.target.value;
});
// JSON data video src
const api_video = [
  {
    id: 1,
    src: "http://techslides.com/demos/sample-videos/small.mp4",
    quality: "1080p",
  },
  {
    id: 2,
    src: "Childish Gambino - Feels Like Summer (Official Music Video)720p.mp4",
    quality: "720p",
  },
];
// map data video src
api_video.map((item) => {
  document.getElementById("qualityvideo").innerHTML = api_video[0].quality;
  var element = document.getElementById("list-q");
  var liTag = document.createElement("li");
  var textQuality = document.createTextNode(item.quality);
  liTag.appendChild(textQuality);
  liTag.style.padding = "5px 10px";
  liTag.id = item.quality;
  element.appendChild(liTag);
  // check user change resolution for change src
  $(`#` + item.quality).on("click", (e) => {
    document.getElementById("qualityvideo").innerHTML = item.quality;
    var video = document.getElementById("video");
    video.pause();
    var loaderdiv = document.querySelector(".loader");
    loaderdiv.style.visibility = "visible";
    var current = video.currentTime;
    video.setAttribute("src", item.src);
    video.load();
    video.currentTime = current;
    loaderdiv.style.visibility = "hidden";
    toggleIconPlayPause();
    video.play();
  });
});
// check user change resolution auto for change src
$("#auto").on("click", (e) => {
  var video = document.getElementById("video");
  video.pause();
  var loaderdiv = document.querySelector(".loader");
  loaderdiv.style.visibility = "visible";
  var current = video.currentTime;
  video.setAttribute("src", api_video[0].src);
  video.load();
  video.currentTime = current;
  loaderdiv.style.visibility = "hidden";
  video.play();
});

$(".fa-cog").on("click", (e) => {
  // alert('pass')
  var settingmenu = document.querySelector(".setting-menu");
  settingmenu.classList.toggle("show");
});