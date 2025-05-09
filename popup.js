const g = id => document.getElementById(id);
const fields = ["code", "nip", "dob", "autologin"];
const svgOpen =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
const svgClosed =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><path d="M1 1l22 22"></path></svg>';

chrome.storage.local.get(fields).then(d => {
  g("code").value = d.code || "";
  g("nip").value  = d.nip  || "";
  g("dob").value  = d.dob  || "";
  g("auto").checked = ("autologin" in d) ? !!d.autologin : true;
  enableAuto();
  initEyes();
});

g("save").onclick = () => {
  status("saving");
  const data = {
    code: g("code").value.trim(),
    nip : g("nip").value.trim(),
    dob : g("dob").value.trim(),
    autologin: g("auto").checked
  };
  chrome.storage.local.set(data, () => {
    enableAuto();
    status("saved");
    setTimeout(() => status(""), 1500);
  });
};

g("auto").onchange = () =>
  chrome.storage.local.set({ autologin: g("auto").checked });

function enableAuto() {
  const ready = g("code").value && g("nip").value && g("dob").value;
  g("auto").disabled = !ready;
}

function status(mode) {
  const s = g("status");
  if (mode === "saving") s.innerHTML = '<span class="spinner"></span>';
  else if (mode === "saved") s.textContent = "Saved ✓";
  else s.textContent = "";
}

function initEyes() {
  document.querySelectorAll(".eye").forEach(btn => {
    const input = g(btn.dataset.for);
    const update = () =>
      btn.innerHTML = input.type === "password" ? svgClosed : svgOpen;
    btn.onclick = () => {
      input.type = input.type === "password" ? "text" : "password";
      update();
    };
    update();
  });
}
