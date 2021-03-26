var requestOptions = {
  method: "GET",
};

async function login() {
  const roll_no = document.getElementById("roll_no");
  var temp = roll_no.value;
  fetch("/get_id/" + temp, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
