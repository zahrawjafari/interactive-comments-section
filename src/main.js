import "./style.css";
import "material-icons/iconfont/material-icons.css";
import "./style.css";
import "material-icons/iconfont/material-icons.css";

const textarea = document.getElementById("commentdiv");
const sendBtn = document.getElementById("sendComment");

const templateCard = document.querySelectorAll(".comment-card")[3];

const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

let currentDeleteCard = null;

// ارسال کامنت
sendBtn.addEventListener("click", () => {
  const text = textarea.value.trim();

  if (text === "") {
    alert("Please write a comment.");
    return;
  }

  const newCard = templateCard.cloneNode(true);

  newCard.classList.remove("hidden");
  newCard.querySelector(".commentText").textContent = text;

  templateCard.parentNode.insertBefore(newCard, templateCard);

  textarea.value = "";

  addCardEvents(newCard);
});

function addCardEvents(card) {
  const deleteBtns = card.querySelectorAll(".deleteBtn");
  const editBtns = card.querySelectorAll(".editBtn");
  const replyBtns = card.querySelectorAll(".reply");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentDeleteCard = card;

      deleteModal.classList.remove("hidden");
      deleteModal.classList.add("flex");
    });
  });

  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      editComment(card);
    });
  });

  replyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      textarea.focus();
      textarea.value = "@";
    });
  });

  addScoreEvents(card);
}

// تایید حذف
confirmDeleteBtn.addEventListener("click", () => {
  if (currentDeleteCard) {
    currentDeleteCard.remove();
    currentDeleteCard = null;
  }

  deleteModal.classList.add("hidden");
  deleteModal.classList.remove("flex");
});

// لغو حذف
cancelDeleteBtn.addEventListener("click", () => {
  currentDeleteCard = null;

  deleteModal.classList.add("hidden");
  deleteModal.classList.remove("flex");
});
// ویرایش کامنت
function editComment(card) {
  const comment = card.querySelector(".commentText");

  const oldText = comment.textContent;

  comment.innerHTML = `
    <textarea class="editArea w-full border border-gray-300 rounded-lg p-3 resize-none">${oldText}</textarea>

    <div class="flex justify-end mt-4">
      <button class="updateBtn bg-[#5457B6] hover:bg-[#7C7DD6] text-white px-6 py-2 rounded-lg font-bold">
        UPDATE
      </button>
    </div>
  `;

  const updateBtn = comment.querySelector(".updateBtn");

  updateBtn.addEventListener("click", () => {
    const newText = comment.querySelector(".editArea").value.trim();

    if (newText === "") return;

    comment.textContent = newText;
  });
}

// امتیاز (+ و -)
function addScoreEvents(card) {
  const plusBtns = card.querySelectorAll(".plus");
  const minusBtns = card.querySelectorAll(".minus");
  const scores = card.querySelectorAll(".score");

  plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      scores[index].textContent =
        Number(scores[index].textContent) + 1;
    });
  });

  minusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const value = Number(scores[index].textContent);

      if (value > 0) {
        scores[index].textContent = value - 1;
      }
    });
  });
}

// فعال کردن امکانات برای کامنت‌های اولیه
document.querySelectorAll(".comment-card").forEach((card) => {
  addCardEvents(card);
});