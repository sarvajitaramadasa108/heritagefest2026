const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbz3kRtDzEtdYCKomFQMwNDs9GW-bxPwMs_BNNFIoLiTTgmqLZxd41odIp_MA3vXVEg72A/exec";


/* =========================
   MODALS
========================= */

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {

  document.querySelectorAll(".modal").forEach(modal => {

    if (event.target === modal) {
      modal.style.display = "none";
    }

  });

};


/* =========================
   FORM SCROLL
========================= */

function scrollToForm(eventName) {

  document
    .getElementById("registrationFormSection")
    .scrollIntoView({
      behavior: "smooth"
    });

  document.getElementById("eventName").value = eventName;

}


/* =========================
   SUCCESS POPUP
========================= */

function closeSuccessPopup() {

  document.getElementById("successPopup")
    .style.display = "none";

}


/* =========================
   FORM SUBMISSION
========================= */

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function(e) {

    e.preventDefault();

    const submitBtn =
      document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      "Submitting...";

    const formData = {

      studentName:
        document.getElementById("studentName").value,

      age:
        document.getElementById("age").value,

      gender:
        document.getElementById("gender").value,

      mobile:
        document.getElementById("mobile").value,

      email:
        document.getElementById("email").value,

      school:
        document.getElementById("school").value,

      city:
        document.getElementById("city").value,

      eventName:
        document.getElementById("eventName").value

    };


    try {

      const response = await fetch(
        WEB_APP_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      submitBtn.disabled = false;
      submitBtn.innerHTML =
        "Submit Registration";

      if (result.status === "success") {

        document
          .getElementById("successPopup")
          .style.display = "flex";

        document
          .getElementById("successMessage")
          .innerHTML =
            "Your Registration ID is <b>" +
            result.registrationId +
            "</b>";

        document
          .getElementById("registrationForm")
          .reset();

      } else {

        alert(
          result.message ||
          "Submission failed."
        );

      }

    } catch(error) {

      submitBtn.disabled = false;

      submitBtn.innerHTML =
        "Submit Registration";

      alert(
        "Unable to submit registration. Please try again."
      );

      console.error(error);

    }

  });


/* =========================
   PAGE ANIMATIONS
========================= */

window.addEventListener("scroll", () => {

  const cards =
    document.querySelectorAll(".category-card");

  cards.forEach(card => {

    const position =
      card.getBoundingClientRect().top;

    const screen =
      window.innerHeight;

    if(position < screen - 100) {

      card.style.opacity = "1";
      card.style.transform =
        "translateY(0px)";

    }

  });

});


/* =========================
   INITIAL CARD STATE
========================= */

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
      "translateY(40px)";

    card.style.transition =
      "all 0.6s ease";

  });


window.dispatchEvent(
  new Event("scroll")
);
