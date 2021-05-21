const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
const enabledText = document.getElementById("enabled");

save.addEventListener("click", () => {
    const blocked = textarea.value.split("\n").map(w => w.trim()).filter(Boolean);
    chrome.storage.local.set({ blocked });
    loadSites();
});

checkbox.addEventListener("change", (event) => {
    const enabled = event.target.checked;
    chrome.storage.local.set({ enabled });
    checked()
});

window.addEventListener("DOMContentLoaded", loadSites);

function loadSites() {
    chrome.storage.local.get(["blocked", "enabled"], function(local) {
        const { blocked, enabled } = local;
        if(!Array.isArray(blocked)) {
            return;
        }

        // Blocked
        textarea.value = blocked.join("\r");

        // Enabled
        checkbox.checked = enabled;
        checked();
        console.log(textarea.value + "is blocked");
    });
}

function checked() {
    if(checkbox.checked) {
        enabledText.innerHTML = "Disable?";
        enabledText.style.backgroundColor = "#521919";
        textarea.style.textDecoration = "none"
        textarea.style.color = "#174633"
    } else {
        enabledText.innerHTML = "Enable?";
        enabledText.style.backgroundColor = "#174633";
        textarea.style.textDecoration = "line-through";
        textarea.style.textDecorationThickness = "15%";
        textarea.style.color = "#521919";
    }
}