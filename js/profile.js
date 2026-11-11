
document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  const profileMessage = document.getElementById("profileMessage");

  const profileFields = [
    "fullName",
    "email",
    "phone",
    "jobTitle"
  ];

  const notificationFields = [
    "emailNotifications",
    "projectNotifications",
    "weeklyNotifications"
  ];

  function loadProfile() {
    const savedProfile = localStorage.getItem("flowpilot-profile");

    if (!savedProfile) return;

    try {
      const profile = JSON.parse(savedProfile);

      profileFields.forEach((id) => {
        if (profile[id] !== undefined) {
          document.getElementById(id).value = profile[id];
        }
      });

      notificationFields.forEach((id) => {
        if (profile[id] !== undefined) {
          document.getElementById(id).checked = profile[id];
        }
      });
    } catch {
      localStorage.removeItem("flowpilot-profile");
    }
  }

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword && newPassword !== confirmPassword) {
      profileMessage.textContent = "Passwords do not match.";
      profileMessage.className = "mt-4 text-sm text-rose-600";
      return;
    }

    const profile = {};

    profileFields.forEach((id) => {
      profile[id] = document.getElementById(id).value.trim();
    });

    notificationFields.forEach((id) => {
      profile[id] = document.getElementById(id).checked;
    });

    localStorage.setItem("flowpilot-profile", JSON.stringify(profile));

    profileMessage.textContent = "Profile settings saved successfully.";
    profileMessage.className = "mt-4 text-sm text-emerald-600";

    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  });

  profileForm.addEventListener("reset", () => {
    setTimeout(() => {
      profileMessage.textContent = "";
    }, 0);
  });

  loadProfile();
});
