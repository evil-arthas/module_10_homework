const btn = document.querySelector("button")



function f(){
  alert(`Ширина экрана:${window.screen.width}, Высота экрана:${window.screen.height}`)
}

btn.addEventListener('click', f)