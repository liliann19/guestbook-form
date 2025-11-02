document.getElementById("guestbook-form").onsubmit = () => {

    clearErrors();
    
    let isValid = true;

    // validate first name
    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // validate last name 
    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // validate email 
    let email = document.getElementById("email").value.trim();
    if (email && (!email.includes("@") || !email.includes("."))) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // validate mailing list (if checked, email must be provided)
    let mailingList = document.getElementById("mailing").checked;
    if (mailingList && !email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    } 

    // validate LinkedIn address
    let linkedInUrl = document.getElementById("linkedin").value.trim();
    if (linkedInUrl && !linkedInUrl.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-linkedInUrl").style.display = "block";
        isValid = false;
    }

    // validate "How we met"
    let howWeMet = document.getElementById("meet").value;
    if (howWeMet === "none") {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }

    return isValid;
};

// hide email format buttons, only visible when mailing list checkbox is checked 
let emailFormatButtons = document.querySelector(".radio-field");
let mailingListCheckbox = document.getElementById("mailing");

emailFormatButtons.style.display = "none";

mailingListCheckbox.addEventListener("change", () => {
    if (mailingListCheckbox.checked) {
        emailFormatButtons.style.display = "flex";
    } 
});

// hide 'Other(please specify)', only visible when 'Other' is selected from dropdown 
let otherField = document.getElementById("other-container");
let howWeMetDropdown = document.getElementById("meet");

otherField.style.display = "none";

howWeMetDropdown.addEventListener("change", () => {
    if (howWeMetDropdown.value === "other") {
        otherField.style.display = "block";
    }
});

// clear errors
function clearErrors() {
    let error = document.getElementsByClassName("errors");
    for (let i = 0; i < error.length; i++) {
        error[i].style.display = "none";
    }
}

