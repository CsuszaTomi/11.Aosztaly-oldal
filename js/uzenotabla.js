document.addEventListener("DOMContentLoaded", function() {
  let savedMessages = JSON.parse(localStorage.getItem("messages")) || [];

  const messageBoard = document.getElementById("message-board");
  const messageInput = document.getElementById("message-input");
  const submitButton = document.getElementById("submit-btn");

  savedMessages.forEach(message => {
    showMessage(message);
  });

  submitButton.addEventListener("click", function() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      showMessage(messageText);
      saveMessage(messageText);
      messageInput.value = "";
    }
  });

  function showMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;

    // törlés gombocska
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Törlés";
    deleteButton.addEventListener("click", function() {
      deleteMessage(message);
      messageElement.remove();
    });
    messageElement.appendChild(deleteButton);

    messageBoard.appendChild(messageElement);
  }

  function saveMessage(message) {
    savedMessages.push(message);
    localStorage.setItem("messages", JSON.stringify(savedMessages));
  }

  // mentés a browserbe
  function deleteMessage(message) {
    const messageIndex = savedMessages.indexOf(message);
    if (messageIndex !== -1) {
      savedMessages.splice(messageIndex, 1);
      localStorage.setItem("messages", JSON.stringify(savedMessages));
    }
  }
});
