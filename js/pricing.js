
document.addEventListener("DOMContentLoaded", () => {
  const billingToggle = document.getElementById("billingToggle");
  const toggleCircle = document.getElementById("toggleCircle");
  const monthlyLabel = document.getElementById("monthlyLabel");
  const yearlyLabel = document.getElementById("yearlyLabel");

  let yearlyBilling = false;

  function updatePrices() {
    document.querySelectorAll("[data-monthly][data-yearly]").forEach((price) => {
      price.textContent = yearlyBilling
        ? price.dataset.yearly
        : price.dataset.monthly;
    });

    document.querySelectorAll("[data-billing-description]").forEach((element) => {
      element.textContent = yearlyBilling ? "yearly" : "monthly";
    });

    billingToggle.setAttribute("aria-checked", String(yearlyBilling));

    toggleCircle.style.transform = yearlyBilling
      ? "translateX(20px)"
      : "translateX(0)";

    monthlyLabel.classList.toggle("text-brand-600", !yearlyBilling);
    monthlyLabel.classList.toggle("text-slate-500", yearlyBilling);

    yearlyLabel.classList.toggle("text-brand-600", yearlyBilling);
    yearlyLabel.classList.toggle("text-slate-500", !yearlyBilling);
  }

  billingToggle.addEventListener("click", () => {
    yearlyBilling = !yearlyBilling;
    updatePrices();
  });

  updatePrices();
});
