const openButton = document.querySelector(".open-button")
const input = document.querySelector("input")
const chat = document.querySelector(".chat")
const sendButton = document.querySelector(".send-button")
const closeButton = document.querySelector(".close-button")
const chatWrapper = document.querySelector(".chat-wrapper")
const geoButton = document.querySelector(".geolocation-button")
const url = "wss://echo-ws-service.herokuapp.com"
let websocket

function pushMessagetoChat(text){
  if(text=="DISCONNECTED" || text=="CONNECTED"){
    const infoMessage = document.createElement("p")
    infoMessage.classList.add("info-message")
    infoMessage.innerText = text
    chat.appendChild(infoMessage)
  } else{
    const message = document.createElement("p")
    message.classList.add("message")
    message.innerText = text
    chat.appendChild(message)
  }
}

openButton.addEventListener("click", ()=>{
  chatWrapper.classList.toggle("hidden")
  websocket = new WebSocket(url);
  websocket.onopen = function(evt) {
    pushMessagetoChat("CONNECTED");
  };
  websocket.onclose = function(evt) {
    pushMessagetoChat("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    pushMessagetoChat(
     evt.data
    );
  };
  websocket.onerror = function(evt) {
    pushMessagetoChat(
      evt.data
    );
  };
});

sendButton.addEventListener('click', () => {
  const messageText = input.value
  pushMessagetoChat(messageText);
  websocket.send(messageText);
});

closeButton.addEventListener("click", ()=>{
  chat.innerHTML = ""
  chatWrapper.classList.toggle("hidden")
  websocket.close()
  websocket = null
})

const success = (pos)=>{
  const latitude = pos.coords.latitude
  const longitude = pos.coords.longitude
  console.log(latitude, longitude)
  const p = document.createElement("p")
  p.classList.add("message")
  const link = document.createElement("a")
  link.textContent="Ссылка на геопозицию"
  link.href=`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
  p.appendChild(link)
  chat.appendChild(p)
  websocket.onmessage=function(){
    console.log("геопозиция отправлена успешно")
  }
  websocket.send(link)
}

const error = ()=>{
  alert("Произошла ошибка при определении геопозиции")
}

geoButton.addEventListener("click", ()=>{
  if(!navigator.geolocation){
    alert("Определение гопозиции невозможно, отсутствует поддержка браузера")
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
})