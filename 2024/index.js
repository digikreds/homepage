
const password_mapping = {
  "qr-bw96w": { password: "kagecreme", location: "test.pdf" },
  "qr-hebht": { password: "flødeskum", location: "test.pdf" },
  "qr-ow5h2": { password: "lagkagebund", location: "test.pdf" },
  "qr-z1wr1": { password: "kirsebærsovs", location: "test.pdf" },
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelectorAll('form');
  const passwordFld = document.querySelectorAll('input[type="password"]')[0];
  const errorContainer = document.getElementById("error")
  const window_url = new URL(window.location.href);

  const password = password_mapping[window_url.pathname.substring(6, (6 + 8))]

  form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('submit' + passwordFld.value);

    if (passwordFld.value === password.password) {
      window.location.href = window_url + password.location;
    } else {
      errorContainer.innerText = "Forkert kodeord, prøv igen"
    }
  });
});
