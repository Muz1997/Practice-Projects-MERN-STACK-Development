var numofDrum = document.querySelectorAll(".drum").length;
for (var i = 0; i < numofDrum; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var innerHtmlbtn = this.innerHTML;
    playsound(innerHtmlbtn);
    keyanimation(innerHtmlbtn);
  });
}

document.addEventListener("keydown", function(event) {
  playsound(event.key);
  keyanimation(event.key);
});





function playsound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;
    default:
      console.log(key);

  }

}

function keyanimation(key) {
  if(key ==="w" || key ==="a" || key ==="s" || key ==="d" || key ==="j" || key ==="k" || key ==="l"){
    var button = document.querySelector("." + key);
    button.classList.add("pressed");
    setTimeout(function() {
      button.classList.remove("pressed");
    }, 100);
  }

}
