// Shared "Install App" button logic — include this on any page that has
// a button with id="install-app-btn". Separate from main.js so pages
// that don't load Firebase can still offer the install prompt.
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById("install-app-btn");
  if (btn) btn.classList.add("show");
});

const installBtn = document.getElementById("install-app-btn");
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.remove("show");
  });
}
