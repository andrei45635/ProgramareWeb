let noOfProfiles = 0;
let profiles = [];
let modifiedValues = [];
let selectedProfile;
let lastModifiedValues = [];


getProfiles();
console.log(profiles);

function getProfiles() {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            profiles = JSON.parse(this.responseText);
            noOfProfiles = profiles.length;
        }
    };
    xhttp.open('GET', "http://localhost/pb3.php", true);
    xhttp.send(null);
}

function save(){
    if(true === confirm("Do you really want to update?")){
        console.log(lastModifiedValues);
        const firstName = lastModifiedValues[0];
        const lastName = lastModifiedValues[1];
        const phone = lastModifiedValues[2];
        const email = lastModifiedValues[3];

        let xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                confirm("Updated!");
            }
        };
        xhttp.open("GET", "http://localhost/pb3_update.php?id="+selectedProfile.studentid+"&fname="+firstName+"&lname="+lastName+"&pnum="+phone+"&email="+email, true);
        xhttp.send(null);
    }
}

function populateSelect() {
    for (let i = 1; i <= noOfProfiles; i++) {
        $('#profileIDs').append($('<option/>', {
            value: i,
            text: i
        }));
    }
    $('#profileIDs').on('change', function () {
        console.log($(this).val());
        createForm($(this).val());
    });
    const saveBtn = document.getElementById('saveButton');
    saveBtn.disabled = true;
}

window.onload = populateSelect;

function getValuesFromInputs(firstNameInput, lastNameInput, phoneInput, emailInput) {
    modifiedValues.push(firstNameInput);
    modifiedValues.push(lastNameInput);
    modifiedValues.push(phoneInput);
    modifiedValues.push(emailInput);
    console.log(modifiedValues);
}

function createForm(id) {
    const form = $('#studentForm');
    let profile = null;
    $.each(profiles, function () {
        if (this.studentid == id) {
            profile = this;
            return false; // break out of loop
        }
    });

    selectedProfile = profile;
    form.empty();

    const fnInput = $('<input type="text" name="' + this + '">');
    const lnInput = $('<input type="text" name="' + this + '">');
    const phInput = $('<input type="text" name="' + this + '">');
    const emInput = $('<input type="text" name="' + this + '">');
    const firstNameInput = fnInput.val(profile.firstname);
    const lastNameInput = lnInput.val(profile.lastname);
    const phoneInput = phInput.val(profile.phone);
    const emailInput = emInput.val(profile.email);
    generateInputs(firstNameInput, lastNameInput, phoneInput, emailInput);
    $('input[type="text"]').on('input', function () {
        const saveBtn = document.getElementById('saveButton');
        saveBtn.disabled = false;
        lastModifiedValues.push($(this).val());
    });
    const saveBtn = document.getElementById('saveButton');
    saveBtn.disabled = true;
    //console.log(lastModifiedValues)
}

function generateInputs(fn, ln, ph, em) {
    const form = $('#studentForm');
    form.append('<strong> First Name ');
    form.append(fn);
    form.append('<br>');
    form.append('<strong> Last Name ');
    form.append(ln);
    form.append('<br>');
    form.append('<strong> Phone ');
    form.append(ph);
    form.append('<br>');
    form.append('<strong> Email ');
    form.append(em);
}
