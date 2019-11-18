// overlay panel interchange-----------------------
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
//---------------------------------------------------

//sign up form--------------------------
document
  .getElementById("signUpForm")
  .addEventListener("submit", performSignUpRequest);

//perform signup request---------------
async function performSignUpRequest(e) {
  const name = document.getElementById("signUpUserName").value;
  const email = document.getElementById("signUpUserEmail").value;
  const password = document.getElementById("signUpUserPassword").value;
  try {
    const res = await axios.post("http://localhost:3000/api/user/register", {
      name: name,
      email: email,
      password: password
    });
    console.log(res);
    alert(res.data);
    document.location.reload();
  } catch (err) {
    alert(err);
  }
  e.preventDefault();
}
//---------------------------------------------------------

//login form-----------------------------------------------
document
  .getElementById("logInForm")
  .addEventListener("submit", performLogInRequest);

//login request---------------------------------------------
async function performLogInRequest(e) {
  console.log("jo");
  const email = document.getElementById("logInUserEmail").value;
  const password = document.getElementById("logInUserPassword").value;
  try {
    const ret = await axios.post("http://localhost:3000/api/user/login", {
      email: email,
      password: password
    });
    console.log(ret.data.authtoken, "login request return");

    //if login request approved, homepage loading-------------------
    if (ret.data.message === "logged-in") {
      localStorage.setItem("token", ret.data.authtoken);
      window.location.href = "feed.html";
    } else {
      alert(ret.data.message);
    }
  } catch (err) {
    console.log(err);
  }
  e.preventDefault();
}
//-------------------------------------------------------------------
