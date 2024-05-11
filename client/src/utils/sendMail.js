import emailjs from "@emailjs/browser";

const EMAIL_SERVICE_ID = "service_6nvkahr";
const EMAIL_TEMPLATE_ID = "template_avfrr32";
const EMAIL_PUBLIC_KEY = "FC1oO8XLEKTtSZepr";

export const sendMail = (
  answerUserName,
  currentUserEmail,
  message,
  question
) => {
  let form = createForm(answerUserName, currentUserEmail, message, question);

  console.log("message in sendMail", message);

  emailjs
    .sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form, EMAIL_PUBLIC_KEY)
    .then(
      (result) => {
        console.log("result sending email" + result);
      },
      (error) => {
        console.log("error sending email" + { error }, error.text);
      }
    );
};

const createForm = (name, email, message, question) => {
  console.log("message here", message);
  const form = document.createElement("form");
  form.style.display = "none";

  const nameInput = document.createElement("input");
  nameInput.type = "hidden";
  nameInput.name = "name";
  nameInput.value = name;
  form.appendChild(nameInput);

  const emailInput = document.createElement("input");
  emailInput.type = "hidden";
  emailInput.name = "email";
  emailInput.value = email;
  form.appendChild(emailInput);

  const messageInput = document.createElement("textarea");
  messageInput.style.display = "none";
  messageInput.name = "message";
  messageInput.value = message;
  console.log("message input", messageInput);
  form.appendChild(messageInput);

  const questionInput = document.createElement("textarea");
  questionInput.style.display = "none"; // Hide message input
  questionInput.name = "question";
  questionInput.value = question;
  form.appendChild(questionInput);

  console.log("fromsdkjfsdkj", form);
  return form;
};
