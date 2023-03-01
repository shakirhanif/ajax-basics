document.getElementById("myForm").addEventListener("submit", formSubmit);
function formSubmit(e) {
  e.preventDefault();
  var rr = new XMLHttpRequest();
  rr.open("POST", "user.php", true);
  rr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  var user = document.getElementById("username").value;
  var param = "username=" + user;
  rr.onload = function () {
    if (this.status == 200) {
      if (!document.getElementById(user)) {
        var newP = document.createElement("div");
        newP.setAttribute("id", user);
        newP.appendChild(document.createTextNode(this.responseText));
        var form = document.getElementById("myForm");
        document.body.insertBefore(newP, form.nextSibling);
      }
    }
  };
  rr.send(param);
}

document.getElementById("getUsers").addEventListener("click", getUsers);
var cond = true;
function getUsers() {
  try {
    axios.post("user.php", "getusers").then(({ data, status }) => {
      if (status == 200 && cond) {
        data.forEach((x) => {
          var newEl = document.createElement("p");
          newEl.appendChild(document.createTextNode(""));
          newEl.innerHTML = x.username;
          document.body.insertBefore(
            newEl,
            document.getElementById("getUsers").nextSibling
          );
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
// function getUsers() {
//   var rr = new XMLHttpRequest();
//   rr.open("POST", "user.php", true);
//   rr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//   rr.onload = function () {
//     if (this.status == 200 && cond) {
//       let res = JSON.parse(this.responseText);
//       for (let i = 0; i < res.length; i++) {
//         const username = res[i].username;

//         var newP = document.createElement("div");
//         newP.setAttribute("id", username);
//         newP.appendChild(document.createTextNode(username));
//         var form = document.getElementById("getUsers");
//         document.body.insertBefore(newP, form.nextSibling);
//       }
//       cond = false;
//     }
//   };
//   rr.send("getusers");
// }
