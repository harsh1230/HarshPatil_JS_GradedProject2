var x = 0;
var size = 0;
var search;

var previous = document.getElementById("previous");
var next = document.getElementById("next");
var structure = document.getElementById("structure");
var error = document.getElementById("error");

async function searchValue(status) {

    var searchValue = document.getElementById("search").value;

    if (status === "next") {

        x += 1;
    }

    else if (status === "previous") {

        x -= 1;
    }

    await fetch("http://localhost:3000/resume")
        .then(response => response.json())
        .then(valueSet => {

            findSize(valueSet);

            if (searchValue.length == 0) {

                controller();
                updatePage(valueSet);
            }

            else {

                var valueSet = Object.values(valueSet).filter(value => {

                    return value.basics.AppliedFor.toLowerCase() === searchValue.toLowerCase();
                });

                findSize(valueSet);

                controller();
                if (size > -1) {

                    updatePage(valueSet);
                }
            }
        })
        .catch(error => console.log(error.message));
}

const controller = function () {

    if (size == -1) {

        previous.style.visibility = "hidden";
        next.style.visibility = "hidden";
        structure.style.display = "none";
        error.style.display = "flex";
        error.style.flexDirection = "row";
        error.style.justifyContent = "space-evenly";
    }

    else if (size == 0) {

        previous.style.visibility = "hidden";
        next.style.visibility = "hidden";
        structure.style.display = "block";
        error.style.display = "none";
    }

    else if (size > 0) {

        error.style.display = "none";

        if (x == 0) {

            previous.style.visibility = "hidden";
            next.style.visibility = "visible";
            structure.style.display = "block";
        }

        else if (x == size) {

            previous.style.visibility = "visible";
            next.style.visibility = "hidden";
            structure.style.display = "block";
        }

        else {

            previous.style.visibility = "visible";
            next.style.visibility = "visible";
            structure.style.visibility = "block";
        }
    }
}

const findSize = function (value) {

    size = Object.keys(value).length - 1;
};

const updatePage = function (value) {

    header(value[x]);
    sidebar(value[x]);
    mainPage(value[x]);
    projects(value[x]);
    education(value[x]);
    internship(value[x]);
    achievements(value[x]);
};

const header = function (value) {

    var code = `

    <div>
          <h3 id="Name">${value.basics.name}</h3>
          <h4 id="Designation">Applied For : ${value.basics.AppliedFor}</h4>
    </div>
    <i class="fas fa-user" style="font-size: 100px; margin-right: 10%"></i>

    `

    document.getElementById("header").innerHTML = code;
};

const sidebar = function (value) {

    var techSkills = ``;
    var hobbies = ``;

    value.skills.keywords.map((item) => { techSkills += `<li>${item}</li>` });
    value.interests.hobbies.map((item) => { hobbies += `<li>${item}</li>` });

    var code = `

    <article class="objective1">
        <h4 class="titles">Personal Information</h4>
        <ul class="detailsList">
           <li>${value.basics.phone}</li>
           <li>${value.basics.email}</li>
           <li><a href=${value.basics.profiles.url} target="blank">LinkedIn</a></li>
        </ul>
    </article>

    <article class="objective1">
        <h4 class="titles">Technical Skills</h4>
        <ul class="detailsList">
           ${techSkills}
        </ul>
    </article>

    <article class="objective1">
        <h4 class="titles">Hobbies</h4>
        <ul class="detailsList">
           ${hobbies}
        </ul>
    </article>

    `

    document.getElementById("leftPage").innerHTML = code;
};

const mainPage = function (value) {

    var ele = ``;
    var props = Object.getOwnPropertyNames(value.work);
    var vals = Object.values(value.work);
    vals.map((item, index) => {

        ele += `<p><b>${props[index]} : </b> ${item}</p>`
    });

    document.getElementById("workDates").innerHTML = ele;
};

const projects = function (value) {

    var code = `

    <p><b>${value.projects.name}</b> : ${value.projects.description}</p>
    
    `
    document.getElementById("projects").innerHTML = code;
};

const education = function (value) {

    var ele = ``;
    var vals = Object.values(value.education);
    var educations = ["UG", "PG", "High School"];

    vals.map((item, index) => {

        var names = Object.values(item);
        ele += `<li><b>${educations[index]} : </b>`;
        names.map((element) => { ele += `${element}, ` });

        if (ele.endsWith(', ')) {

            ele = ele.slice(0, -2);
        }

        ele += `</li>`;
    });

    document.getElementById("education").innerHTML = ele;
};

const internship = function (value) {

    var ele = ``;
    var props = Object.getOwnPropertyNames(value.Internship);
    var vals = Object.values(value.Internship);

    vals.map((item, index) => {

        ele += `<li><b>${props[index]} : </b> ${item}</li>`;
    });

    document.getElementById("internship").innerHTML = ele;
};

const achievements = function (value) {

    var ele = ``;
    value.achievements.Summary.map((item) => { ele += `<li>${item}</li>` });

    document.getElementById("achievements").innerHTML = ele;
};

