window.history.forward();

function noBack() {

    window.history.forward();
}

sessionStorage.setItem("credentials", JSON.stringify({ name: ["harsh", "harry"], password: ["123", "345"] }));
var res = sessionStorage.getItem("credentials");
console.log(res);

function validateCredentials() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var cred = JSON.parse(res);
    cred.name.map((item, index) => {

        if (username === item && password === cred.password[index]) {

            location.href = "resume_search.html";
        }

        else {

            document.getElementById("error").innerHTML = "Invalid username/password!";
        }
    });
}
