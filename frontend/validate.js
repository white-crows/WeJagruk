async function validateUser() {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html?#";
  } else {
    try {
      console.log("token exists");
      //token validation check----------------------------------
      const res = await axios.get("http://localhost:3000/api/posts", {
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      //token not valid, perform logout-----------------
      if (res.data === "access-denied") {
        performLogOut();
      }
    } catch (err) {
      console.log(err);
      performLogOut();
    }
  }
}

//logout action-------------------------------------------
function performLogOut() {
  console.log("logout-clicked");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html?#";
}
//---------------------------------------------------------
