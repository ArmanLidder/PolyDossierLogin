(async () => {
  const { code, nip, dob, autologin } =
    await chrome.storage.local.get(["code","nip","dob","autologin"]);

  if (!code || !nip || !dob) return;

  const codeBox = document.getElementById("code");
  if (!codeBox || codeBox.value) return;

  codeBox.value = code;
  document.getElementById("nip").value = nip;
  document.getElementById("naissance").value = dob;

  if (autologin) {
    const form = document.querySelector('form[action*="ValidationServlet"]');
    if (form) form.submit();
  }
})();
