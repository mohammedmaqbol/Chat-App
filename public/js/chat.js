const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const shoWmessage = document.getElementById('messages')
document.getElementById('username').innerHTML = 'Hello' + ' ' + name + '👌'

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if (input.value) {
    let message = input.value
    socket.emit('message', message, name);
    input.value = ' '
   }
  })
    
    socket.on('message', (data)=>{
      let date = new Date() 
      
      //Display JavaScript datetime in 12 hour AM/PM format?
      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime; 
      }
      //If the current date is identical to the date the message was sent,
      // the date will not appear if it is not displayed.

      shoWmessage.innerHTML += `<div> 
                                <span class='timeMsg'>`+ formatAMPM(date) + `</span>`+`<br/>` +
                                `<span class='msg'>`
                                  + `<span class='sender'>` + data.senderName + `</span>`+ 
                                  ' : ' 
                                  + `<span class='textMsg'>` + data.message + `</span>`+ 
                                 `</span>`+ 
                                  `<br/>
                                </div>`

});