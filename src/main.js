import './style.css'
import "material-icons/iconfont/material-icons.css";
const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");
plusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const score = button.parentElement.querySelector(".score");
    let value = Number(score.textContent);
    value++;
    score.textContent = value;
  });
});
minusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const score = button.parentElement.querySelector(".score");
    let value = Number(score.textContent);
    if(value > 0){
      value--;
      score.textContent = value;
    }
  });
});
const replyButtons = document.querySelectorAll(".reply");
replyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".comment-card");
    const oldReply = card.querySelector(".reply-box");
    if (oldReply) {
      oldReply.remove();
      return;
    }
    const replyBox = document.createElement("div");
    replyBox.className = "reply-box mt-5 flex gap-3";
    replyBox.innerHTML = `
      <textarea
        class="flex-1 border rounded-lg p-3 h-[80px] resize-none outline-none"
        placeholder="Reply..."
      ></textarea>
      <button
        class="send-reply bg-[#5457B6] text-white px-5 h-[45px] rounded-lg font-bold">
        SEND
      </button>
    `;
    card.appendChild(replyBox);
    const sendReply = replyBox.querySelector(".send-reply");
    sendReply.addEventListener("click", () => {
      const text = replyBox.querySelector("textarea").value;
      if (text.trim() !== "") {
        const newReply = document.createElement("p");
        newReply.className = "mt-4 bg-[#f5f6fa] p-4 rounded-lg text-gray-600";
        newReply.textContent = text;
        card.appendChild(newReply);
        replyBox.remove();
      }
    });
  });
});
