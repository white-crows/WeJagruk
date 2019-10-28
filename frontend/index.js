async function clicked() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html?#";
  } else {
    try {
      console.log("clicked");
      //token validation check----------------------------------
      const res = await axios.get("http://localhost:3000/api/posts", {
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      //token not valid, perform logout-----------------
      if (res.data === "access-denied") {
        logOut();
      } else {
        document.getElementById("response").innerHTML = res.data;
      }
    } catch (err) {
      console.log(err);
      logOut();
    }
  }
}

//logout action-------------------------------------------
function logOut() {
  console.log("logout-clicked");
  localStorage.removeItem("token");
  window.location.href = "login.html?#";
}
//---------------------------------------------------------
