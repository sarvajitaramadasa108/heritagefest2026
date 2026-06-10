const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz3kRtDzEtdYCKomFQMwNDs9GW-bxPwMs_BNNFIoLiTTgmqLZxd41odIp_MA3vXVEg72A/exec";

function scrollToForm(eventName) {
  document.getElementById("eventName").value = eventName;

  document
    .getElementById("registrationFormSection")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const data = {
      studentName: document.getElementById("studentName").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      school: document.getElementById("school").value,
      city: document.getElementById("city").value,
      eventName: document.getElementById("eventName").value
    };

    try {

      const response = await fetch(WEBAPP_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === "success") {

        document.getElementById("successMessage").innerHTML =
          "Your Registration ID is <b>" +
          result.registrationId +
          "</b>";

        document.getElementById("successPopup").style.display = "flex";

        document.getElementById("registrationForm").reset();

      } else {

        alert(result.message || "Submission failed.");

      }

    } catch (error) {

      console.error(error);
      alert("Unable to submit registration.");

    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Registration";

  });
