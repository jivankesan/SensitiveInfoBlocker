document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.getElementById("toggle-switch");
  const status = document.getElementById("status");

  toggleSwitch.addEventListener("change", function() {
    if (this.checked) {
      status.textContent = "Active";
    } else {
      status.textContent = "Inactive";
    }
  });
});
