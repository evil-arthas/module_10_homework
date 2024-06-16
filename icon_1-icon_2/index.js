const btn = document.querySelector("button")
const filled = document.querySelector(".filled")
const unfilled = document.querySelector(".unfilled")


function f(){
  filled.classList.toggle("hidden")
  unfilled.classList.toggle("hidden")
}

btn.addEventListener('click', f)