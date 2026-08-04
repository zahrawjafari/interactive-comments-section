import "./style.css";
import "material-icons/iconfont/material-icons.css";
const textarea = document.getElementById("commentdiv");
const sendBtn = document.getElementById("sendComment");
const templateCard = document.querySelector(".comment-card.hidden");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
let currentDeleteCard = null;
function saveComments() {
  const data = [];
  document.querySelectorAll(".comment-card:not(.hidden)").forEach((card) => {
    data.push({
      text: card.querySelector(".commentText")?.textContent,
      score: card.querySelector(".score")?.textContent,
      time: card.querySelector(".comment-time")?.dataset.time,
    });
  });
  localStorage.setItem("comments", JSON.stringify(data));
}
function timeAgo(time) {
  const seconds = Math.floor((Date.now() - Number(time)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
function updateTimes() {
  document.querySelectorAll(".comment-time").forEach((time) => {
    if (time.dataset.time) {
      time.textContent = timeAgo(time.dataset.time);
    }
  });
}
setInterval(updateTimes, 60000);
sendBtn.addEventListener("click",()=>{
  const text =
  textarea.value.trim();
  if(text === ""){
    alert("Please write a comment.");
    return;
  }
  const newCard =
  templateCard.cloneNode(true);
  newCard.classList.remove("hidden");
  newCard.querySelector(".commentText")
  .textContent = text;
  newCard.querySelectorAll(".score")
  .forEach(score=>{
    score.textContent = "0";
  });
  const time =
  newCard.querySelector(".comment-time");
  if(time){
    const now =
    Date.now();
    time.dataset.time = now;
    time.textContent =
    timeAgo(now);
  }
  templateCard.parentNode.insertBefore(
    newCard,
    templateCard
  );
  textarea.value = "";
  addCardEvents(newCard);
  saveComments();
});
function replyComment(card){
  const username =
  card.querySelector("h3")
  .textContent
  .trim();
  textarea.focus();
  textarea.value =
  `@${username} `;
  textarea.setSelectionRange(
    textarea.value.length,
    textarea.value.length
  );
}
function editComment(card){
  const commentText =
  card.querySelector(".commentText");
  const oldText =
  commentText.textContent.trim();
  if(card.querySelector(".editArea"))
    return;
  commentText.innerHTML = `
  <textarea 
  class="editArea w-full border border-gray-300 rounded-lg p-3 resize-none">
  ${oldText}
  </textarea>
  <button 
  class="updateBtn mt-3 bg-[#5457B6] text-white px-5 py-2 rounded-lg">
  UPDATE
  </button>
  `;
  const updateBtn =
  card.querySelector(".updateBtn");
  updateBtn.addEventListener("click",()=>{
    const newText =
    card.querySelector(".editArea")
    .value
    .trim();
    if(newText === "")
      return;
    commentText.textContent =
    newText;
    saveComments();
  });
}
function openDeleteModal(card){
  currentDeleteCard = card;
  deleteModal.classList.remove("hidden");
  deleteModal.classList.add("flex");
}
confirmDeleteBtn.addEventListener("click",()=>{
  if(currentDeleteCard){
    currentDeleteCard.remove();
    currentDeleteCard = null;
    saveComments();
  }
  deleteModal.classList.add("hidden");
  deleteModal.classList.remove("flex");
});
cancelDeleteBtn.addEventListener("click",()=>{
  currentDeleteCard = null;
  deleteModal.classList.add("hidden");
  deleteModal.classList.remove("flex");
});
deleteModal.addEventListener("click",(e)=>{
  if(e.target === deleteModal){
    currentDeleteCard = null;
    deleteModal.classList.add("hidden");
    deleteModal.classList.remove("flex");
  }
});
function addScoreEvents(card){
  const plusBtns =
  card.querySelectorAll(".plus");
  const minusBtns =
  card.querySelectorAll(".minus");
  const scores =
  card.querySelectorAll(".score");
  plusBtns.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
      let value =
      Number(scores[index].textContent);
      scores[index].textContent =
      value + 1;
      saveComments();
    });
  });
  minusBtns.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
      let value =
      Number(scores[index].textContent);
      if(value > 0){
        scores[index].textContent =
        value - 1;
      }
      saveComments();
    });
  });
}
function addCardEvents(card){
  card.querySelectorAll(".reply")
  .forEach(btn=>{
    btn.addEventListener("click",()=>{
      replyComment(card);
    });
  });
  card.querySelectorAll(".editBtn")
  .forEach(btn=>{
    btn.addEventListener("click",()=>{
      editComment(card);
    });
  });
  card.querySelectorAll(".deleteBtn")
  .forEach(btn=>{
    btn.addEventListener("click",()=>{
      openDeleteModal(card);
    });
  });
  addScoreEvents(card);
}
document
.querySelectorAll(".comment-card")
.forEach(card=>{
  if(!card.classList.contains("hidden")){
    addCardEvents(card);
  }
});
updateTimes();