const body = document.querySelector("body");

const newFooter = document.createElement("footer");

body.appendChild(newFooter);


const today = new Date();

const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `© ${thisYear} Jittu Pulikottil Sunny`;

footer.appendChild(copyright);
// Skills

const skills = ["JavaScript", "HTML", "CSS", "GitHub"];

const skillsSection = document.querySelector("#Skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {

    const skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}
const messageForm= document.querySelector('form[name="leave_message"]')
messageForm.addEventListener("submit",function(event){
     event.preventDefault();
     const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const userMessage = event.target.userMessage.value;

    console.log(usersName);
    console.log(usersEmail);
    console.log(userMessage);
    const messageSection=document.querySelector("#LeaveMessage")
    const messageList=messageSection.querySelector("ul")
    const newMessage=document.createElement("li")
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>: <span>${userMessage}</span>`;
    const removeButton=document.createElement("button")
    removeButton.innerText="remove"
    removeButton.type="button"
    removeButton.addEventListener("click",function(event)
{
    const entry=removeButton.parentNode
    entry.remove()
    newMessage.appendChild(removeButton)
    messageList.appendChild(newMessage)
})
    messageForm.reset();
})