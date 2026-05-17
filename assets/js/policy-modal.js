(() => {
  const DEFAULT_POLICY_URL =
    "https://public.etal.solutions/docs/et-al-solutions-llc/et-al-solutions-llc-privacy-policy.html";

  function closePolicyModal() {
    const modal = document.querySelector("[data-policy-modal-backdrop]");
    if (!modal) return;

    const frame = modal.querySelector("iframe");
    if (frame) frame.src = "about:blank";

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("policy-modal-open");
  }

  function openPolicyModal(url) {
    let modal = document.querySelector("[data-policy-modal-backdrop]");

    if (!modal) {
      modal = document.createElement("div");
      modal.className = "policy-modal-backdrop";
      modal.setAttribute("data-policy-modal-backdrop", "");
      modal.setAttribute("aria-hidden", "true");

      modal.innerHTML = `
        <div class="policy-modal" role="dialog" aria-modal="true" aria-label="Privacy Policy">
          <button class="policy-modal-close" type="button" aria-label="Close privacy policy">×</button>
          <iframe title="Privacy Policy"></iframe>
        </div>
      `;
      
      document.body.appendChild(modal);

      modal.querySelector(".policy-modal-close").addEventListener("click", closePolicyModal);

      modal.addEventListener("click", (event) => {
        if (event.target === modal) closePolicyModal();
      });
    }

    const frame = modal.querySelector("iframe");
    frame.src = url || DEFAULT_POLICY_URL;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("policy-modal-open");

    const closeButton = modal.querySelector(".policy-modal-close");
    closeButton.focus();
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-policy-modal]");
    if (!link) return;

    event.preventDefault();
    openPolicyModal(link.getAttribute("href") || DEFAULT_POLICY_URL);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePolicyModal();
  });
})();
