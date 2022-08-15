// 獲取今天的日期

let now = new Date();
now.setTime(now.getTime());
let today =
  now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

console.log(today);

// 獲取明天的日期

let tomorrow = new Date();

tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);

let nextDay =
  tomorrow.getFullYear() +
  "-" +
  (tomorrow.getMonth() + 1) +
  "-" +
  tomorrow.getDate();

console.log(nextDay);

let signInBtn = document.getElementById("signInBtn");
let alreadySignInBtn = document.getElementById("alreadySignInBtn");
let isSignIn = false;

signInBtn.addEventListener("click", function () {
  signInBtn.style.display = "none";
  alreadySignInBtn.style.display = "block";
});
