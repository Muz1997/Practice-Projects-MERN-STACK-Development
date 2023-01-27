var dice1 =Math.floor(Math.random()*6)+1;

var src1="images/dice"+dice1+".png";

var image1=document.querySelectorAll("img")[0];

image1.setAttribute("src", src1);

var dice2 =Math.floor(Math.random()*6)+1;

var src2="images/dice"+dice2+".png";

var image1=document.querySelectorAll("img")[1];

image1.setAttribute("src", src2);


 if(dice1===dice2){
   document.querySelector("h1").innerHTML ='Draw';
 } else if(dice1 > dice2){
   document.querySelector("h1").innerHTML ="🚩Player 1 Wins!";
 } else{
   document.querySelector("h1").innerHTML ="Player 2 Wins!🚩";
 }
