function validateDate(birthday) {
    let dt1 = new Date();
    const dt2 = new Date(birthday.value.toString());
    return !(dt2 < dt1);
}

function validateAge(agers, dt1, dt2) {
    let varsta = dt1.getFullYear() - dt2.getFullYear();
    return +agers.value.toString() === varsta;

}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validate() {
    const nume = document.getElementById("nameTF");
    const bday = document.getElementById("bdayTF");
    const age = document.getElementById("ageTF");
    const email = document.getElementById("emailTF");

    let errors = "";

    if(!/^[a-zA-Z ]+$/.test( nume.value)) {
        errors += "The name field can't contain digits!\n";
        nume.style.borderColor = "red";
    } else {
        nume.style.borderColor = "green";
    }

    if (validateDate(bday)) {
        errors += "Invalid date!\n";
        bday.style.borderColor = "red";
    } else {
        bday.style.borderColor = "green";
    }

    let date1 = new Date();
    const date2 = new Date(bday.value.toString());

    if (!validateAge(age, date1, date2) || age.value == null) {
        errors += "Invalid age!\n";
        age.style.borderColor = "red";
    } else {
        age.style.borderColor = "green";
    }

    if (!validateEmail(email.value) || email.value == null) {
        errors += "Invalid email!\n";
        email.style.borderColor = "red";
    } else {
        email.style.borderColor = "green";
    }

    if (errors.length > 0) {
        window.alert(errors);
    } else {
        window.alert("All's well!");
    }
}