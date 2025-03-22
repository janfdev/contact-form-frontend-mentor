document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const inputs = {
    firstName: form.querySelector("#firstName"),
    lastName: form.querySelector("#lastName"),
    email: form.querySelector("#email"),
    queryType: form.querySelector('input[name="queryType"]:checked'),
    message: form.querySelector("#message"),
    terms: form.querySelector("#consent"),
  };

  let isValid = true;

  // Bersihkan error sebelumnya
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.textContent = ""));

  // Validasi First Name
  if (inputs.firstName.value.trim() === "") {
    showError(inputs.firstName, "This field is required");
    isValid = false;
  }

  // Validasi Last Name
  if (inputs.lastName.value.trim() === "") {
    showError(inputs.lastName, "This field is required");
    isValid = false;
  }

  // Validasi Email
  if (!inputs.email.value.match(/^\S+@\S+\.\S+$/)) {
    showError(inputs.email, "Please enter a valid email address");
    isValid = false;
  }

  // Validasi Query Type
  if (!inputs.queryType) {
    showError(
      form.querySelector(".input-section-query"),
      "Please select a query type"
    );
    isValid = false;
  }

  // Validasi Message
  if (inputs.message.value.trim() === "") {
    showError(inputs.message, "This field is required");
    isValid = false;
  }

  // Validasi  Checkbox
  if (!inputs.terms.checked) {
    showError(
      form.querySelector(".checkbox-section"),
      "Please accept the terms and conditions"
    );
    isValid = false;
  }

  if (isValid) {
    const successAlert = document.querySelector(".success-alert");
    const progressBar = document.querySelector(".progress-bar");

    successAlert.style.display = "block";
    form.reset();
    progressBar.classList.add("active");

    setTimeout(() => {
      successAlert.style.display = "none";
      progressBar.classList.remove("active");
    }, 5000);
  } else {
    successAlert.style.display = "none";
  }
});

function showError(element, message) {
  const errorMessage = element
    .closest(
      ".input-section, .input-section-query, .checkbox-section, .radio-group"
    )
    ?.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
  }
}
