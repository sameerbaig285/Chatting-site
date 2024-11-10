const socket=io('http://localhost:3000')
const name1= prompt("enter you name to join")
const form=document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer=document.querySelector(".container")
var audio=new Audio('ting.mp3')
const append=(message,position)=>{
    const messageelement=document.createElement('div')
    messageelement.innerText=message;
    messageelement.classList.add('message')
    messageelement.classList.add(position)
    messagecontainer.append(messageelement);
    if(position=='left')
    {
        audio.play()
    }
   
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message=messageinput.value
    append(`you : ${message}`,'right')  // message send karne ke liye
    socket.emit('send',message)
    messageinput.value=''
})
socket.emit('new-user-joined', name1)
socket.on('user-joined',name1=>{
      append(`${name1} joined the chat` , 'right')
})
socket.on('receive',data=>{
      append(`${data.name1} : ${data.message}`,'left')
})
socket.on('left',name1=>{
      append(`${name1} : left the chat `,'left')
})
