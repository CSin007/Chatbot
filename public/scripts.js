const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatMessages = document.querySelector(".chat-messages");
const chatHistory = document.querySelector(".chat-history");

async function fetchChats() {
  const response = await fetch("/api/chats");
  const chats = await response.json();

  chatHistory.innerHTML = chats
    .map((chat) => `<p>${chat.userMessage}</p>`)
    .join("");

  chatMessages.innerHTML = chats
    .map(
      (chat) =>
        `<p class="user-message">${chat.userMessage}</p>
         <p class="bot-message">${chat.botResponse}</p>`
    )
    .join("");
}

fetchChats();

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value;
  userInput.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  chatMessages.innerHTML += `<p class="user-message">${data.userMessage}</p>
                             <p class="bot-message">${data.botResponse}</p>`;

  chatHistory.innerHTML += `<p>${data.userMessage}</p>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
