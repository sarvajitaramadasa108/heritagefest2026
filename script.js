/* ==========================
   CONFIGURATION
========================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbz3kRtDzEtdYCKomFQMwNDs9GW-bxPwMs_BNNFIoLiTTgmqLZxd41odIp_MA3vXVEg72A/exec";


const categories = {

  "Coloring": {
    classes: [1,2,3,4],
    code: "CLR"
  },

  "Painting": {
    classes: [5,6,7,8,9,10],
    code: "PNT"
  },

  "Puranic Costumes": {
    classes: [1,2,3,4],
    code: "PRC"
  },

  "Gita Shloka Chanting": {
    classes: [1,2,3,4,5,6,7,8,9,10],
    code: "GSC"
  },

  "Vocal Music": {
    classes: [5,6,7,8,9,10],
    code: "VCM"
  },

  "Drama": {
    classes: [5,6,7,8,9,10],
    code: "DRM"
  },

  "Pottery Painting": {
    classes: [5,6,7,8,9,10],
    code: "PTP"
  },

  "Paper Craft Work": {
    classes: [5,6,7,8,9,10],
    code: "PCW"
  }

};


/* ==========================
   GUIDELINES
========================== */

const guidelines = {

  "coloringGuidelines": {
    title: "Coloring Competition Guidelines",
    points: [
      "Use crayons, sketch pens or color pencils.",
      "Theme announced by organizers must be followed.",
      "Complete the artwork within allotted time.",
      "Judging based on neatness and creativity."
    ]
  },

  "paintingGuidelines": {
    title: "Painting Competition Guidelines",
    points: [
      "Participants must bring their own materials.",
      "Theme announced by organizers must be followed.",
      "Complete artwork within allotted time.",
      "Judging based on creativity and presentation."
    ]
  },

  "costumeGuidelines": {
    title: "Puranic Costumes Guidelines",
    points: [
      "Dress as a character from Vedic literature.",
      "Simple introduction may be requested.",
      "Props should be safe and appropriate.",
      "Judging based on presentation and authenticity."
    ]
  },

  "gitaGuidelines": {
    title: "Gita Shloka Chanting Guidelines",
    points: [
      "Shlokas should be memorized.",
      "Pronunciation should be clear.",
      "Maintain proper decorum.",
      "Judging based on memory and presentation."
    ]
  },

  "musicGuidelines": {
    title: "Vocal Music Guidelines",
    points: [
      "Only devotional songs allowed.",
      "Time limits must be followed.",
      "Maintain proper rhythm and melody.",
      "Judging based on overall performance."
    ]
  },

  "dramaGuidelines": {
    title: "Drama Competition Guidelines",
    points: [
      "Performance should convey good values.",
      "Team members must report on time.",
      "Time limits should be followed.",
      "Judging based on acting and message."
    ]
  },

  "potteryGuidelines": {
    title: "Pottery Painting Guidelines",
    points: [
      "Use approved colors only.",
      "Complete work within allotted time.",
      "Maintain neatness.",
      "Judging based on creativity."
    ]
  },

  "paperGuidelines": {
    title: "Paper Craft Work Guidelines",
    points: [
      "Only paper craft materials allowed.",
      "Pre-made crafts are not permitted.",
      "Creativity is encouraged.",
      "Judging based on craftsmanship."
    ]
  }

};


/* ==========================
   COUNTDOWN TIMER
========================== */

function startCountdown() {

  const eventDate =
    new Date("September 9, 2026 00:00:00");

  const countdown =
    document.getElementById("countdown");

  setInterval(() => {

    const now = new Date();

    const diff =
      eventDate.getTime() -
      now.getTime();

    if(diff <= 0){

      countdown.innerHTML =
        "Heritage Fest Has Started";

      return;
    }

    const days =
      Math.floor(diff / (1000*60*60*24));

    const hours =
      Math.floor(
        (diff % (1000*60*60*24))
        /(1000*60*60)
      );

    const minutes =
      Math.floor(
        (diff % (1000*60*60))
        /(1000*60)
      );

    const seconds =
      Math.floor(
        (diff % (1000*60))
        /1000
      );

    countdown.innerHTML =
      `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds Left`;

  },1000);

}


/* ==========================
   INITIALIZATION
========================== */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    populateCategories();

    generateGuidelineModals();

    addStudentBlock();

    startCountdown();

  }
);


/* ==========================
   CATEGORY DROPDOWN
========================== */

function populateCategories(){

  const select =
    document.getElementById(
      "categorySelect"
    );

  select.innerHTML =
    '<option value="">Select Category</option>';

  Object.keys(categories)
    .forEach(category => {

      select.innerHTML +=
      `<option value="${category}">
      ${category}
      </option>`;

    });

  select.addEventListener(
    "change",
    updateEligibility
  );

}


/* ==========================
   UPDATE ELIGIBILITY
========================== */

function updateEligibility(){

  const category =
    document.getElementById(
      "categorySelect"
    ).value;

  if(!category) return;

  const classList =
    categories[category].classes;

  document.getElementById(
    "eligibleClasses"
  ).value =
    classList.join(", ");

  updateAllStudentDropdowns();

}


/* ==========================
   SCROLL TO FORM
========================== */

function scrollToForm(category){

  document
    .getElementById("registrationSection")
    .scrollIntoView({
      behavior:"smooth"
    });

  document
    .getElementById("categorySelect")
    .value = category;

  updateEligibility();

}


/* ==========================
   STUDENT BLOCK
========================== */

let studentCount = 0;

function addStudentBlock(){

  studentCount++;

  const container =
    document.getElementById(
      "studentsContainer"
    );

  const card =
    document.createElement("div");

  card.className =
    "student-card";

  card.innerHTML = `

    <h3>
      Student ${studentCount}
    </h3>

    <div class="form-grid">

      <div>
        <label>Student Name</label>
        <input
          type="text"
          class="student-name">
      </div>

      <div>
        <label>Gender</label>

        <select
          class="student-gender">

          <option value="">
            Select Gender
          </option>

          <option>
            Male
          </option>

          <option>
            Female
          </option>

        </select>

      </div>

      <div>
        <label>Class</label>

        <select
          class="student-class">
        </select>

      </div>

    </div>

  `;

  container.appendChild(card);

  updateAllStudentDropdowns();

}

/* ==========================
   GALLERY CONFIG
========================== */

const galleries = {

  "Coloring": {
    folder: "images/coloring/",
    total: 10,
    prefix: "Coloring"
  },

  "Painting": {
    folder: "images/painting/",
    total: 10,
    prefix: "Painting"
  },

  "Puranic Costumes": {
    folder: "images/puranic-costumes/",
    total: 10,
    prefix: "Costume"
  },

  "Gita Shloka Chanting": {
    folder: "images/gita-shloka/",
    total: 10,
    prefix: "Gita"
  },

  "Vocal Music": {
    folder: "images/vocal-music/",
    total: 10,
    prefix: "Music"
  },

  "Drama": {
    folder: "images/drama/",
    total: 10,
    prefix: "Drama"
  },

  "Pottery Painting": {
    folder: "images/pottery/",
    total: 10,
    prefix: "Pottery"
  },

  "Paper Craft Work": {
    folder: "images/paper-craft/",
    total: 10,
    prefix: "Paper"
  }

};


/* ==========================
   GALLERY VARIABLES
========================== */

let currentGallery = [];
let currentImageIndex = 0;


/* ==========================
   OPEN GALLERY
========================== */

function openGallery(category){

  const gallery =
    galleries[category];

  if(!gallery) return;

  currentGallery = [];

  for(let i=1;i<=gallery.total;i++){

    currentGallery.push(
      gallery.folder +
      gallery.prefix +
      i +
      ".jpg"
    );

  }

  currentImageIndex = 0;

  document.getElementById(
    "galleryImage"
  ).src =
    currentGallery[0];

  document.getElementById(
    "galleryModal"
  ).style.display = "flex";

}


/* ==========================
   CLOSE GALLERY
========================== */

function closeGallery(){

  document.getElementById(
    "galleryModal"
  ).style.display = "none";

}


/* ==========================
   NEXT IMAGE
========================== */

function nextImage(){

  currentImageIndex++;

  if(
    currentImageIndex >=
    currentGallery.length
  ){
    currentImageIndex = 0;
  }

  document.getElementById(
    "galleryImage"
  ).src =
    currentGallery[currentImageIndex];

}


/* ==========================
   PREVIOUS IMAGE
========================== */

function previousImage(){

  currentImageIndex--;

  if(currentImageIndex < 0){

    currentImageIndex =
      currentGallery.length - 1;

  }

  document.getElementById(
    "galleryImage"
  ).src =
    currentGallery[currentImageIndex];

}


/* ==========================
   GENERATE GUIDELINES
========================== */

function generateGuidelineModals(){

  const container =
    document.getElementById(
      "guidelinesContainer"
    );

  Object.keys(guidelines)
  .forEach(id => {

    const data =
      guidelines[id];

    let html = "";

    data.points.forEach(point => {

      html += `<li>${point}</li>`;

    });

    container.innerHTML += `

      <div
      class="guideline-modal"
      id="${id}">

        <div
        class="guideline-content">

          <span
          class="close-btn"
          onclick="closeModal('${id}')">
          &times;
          </span>

          <h2>
          ${data.title}
          </h2>

          <ul>
            ${html}
          </ul>

        </div>

      </div>

    `;

  });

}


/* ==========================
   OPEN MODAL
========================== */

function openModal(id){

  document
    .getElementById(id)
    .style.display = "flex";

}


/* ==========================
   CLOSE MODAL
========================== */

function closeModal(id){

  document
    .getElementById(id)
    .style.display = "none";

}


/* ==========================
   UPDATE STUDENT CLASSES
========================== */

function updateAllStudentDropdowns(){

  const category =
    document.getElementById(
      "categorySelect"
    ).value;

  if(!category) return;

  const classes =
    categories[category].classes;

  document
    .querySelectorAll(
      ".student-class"
    )
    .forEach(dropdown => {

      dropdown.innerHTML = "";

      classes.forEach(cls => {

        dropdown.innerHTML +=
        `<option value="${cls}">
          Class ${cls}
        </option>`;

      });

    });

}


/* ==========================
   ADD STUDENT BUTTON
========================== */

document.addEventListener(
  "click",
  function(e){

    if(
      e.target.id ===
      "addStudentBtn"
    ){

      addStudentBlock();

    }

  }
);


/* ==========================
   SUCCESS POPUP
========================== */

function showSuccess(message){

  document.getElementById(
    "successMessage"
  ).innerHTML = message;

  document.getElementById(
    "successPopup"
  ).style.display = "flex";

}


function closeSuccessPopup(){

  document.getElementById(
    "successPopup"
  ).style.display = "none";

}


/* ==========================
   CLOSE ON OUTSIDE CLICK
========================== */

window.onclick = function(event){

  document
    .querySelectorAll(
      ".modal,.guideline-modal"
    )
    .forEach(modal => {

      if(event.target === modal){

        modal.style.display =
          "none";

      }

    });

};
