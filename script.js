const checklistItems = [
    {
        category: "Governance",
        title: "Scope & System Description Review",
        cadence: "Annual"
    },
    {
        category: "Governance",
        title: "Annual Risk Assessment",
        cadence: "Annual"
    },
    {
        category: "Governance",
        title: "Annual Policy Review",
        cadence: "Annual"
    },
    {
        category: "Governance",
        title: "Security Awareness Training (including Role Based)",
        cadence: "Annual"
    },
    {
        category: "Governance",
        title: "BoD / Management Review",
        cadence: "Annual"
    },

    {
        category: "Access Management",
        title: "Annual User Access Review",
        cadence: "Annual"
    },
    {
        category: "Access Management",
        title: "Quarterly Privileged Access Review",
        cadence: "Quarterly"
    },
    {
        category: "Access Management",
        title: "On/Off Boarding Checklist",
        cadence: "Ongoing"
    },
    {
        category: "Access Management",
        title: "NDA, Background Checks, & Performance Reviews",
        cadence: "Ongoing"
    },
    {
        category: "Access Management",
        title: "Staff & Contractor Policy Acknowledgement",
        cadence: "Annual"
    },

    {
        category: "Security Testing",
        title: "Annual External Penetration Test",
        cadence: "Annual"
    },
    {
        category: "Security Testing",
        title: "Vulnerability Scanning & Remediation Review",
        cadence: "Recurring"
    },
    {
        category: "Security Testing",
        title: "Annual Critical Vendor Risk Reviews",
        cadence: "Annual"
    },

    {
        category: "Incident Response",
        title: "Annual Incident Response Tabletop Exercise",
        cadence: "Annual"
    },
    {
        category: "Incident Response",
        title: "Annual Business Continuity / Disaster Recovery Test",
        cadence: "Annual"
    },
    {
        category: "Incident Response",
        title: "Annual Backup Restoration Test",
        cadence: "Annual"
    },

    {
        category: "Monitoring",
        title: "Recurring Security Alert Review",
        cadence: "Recurring"
    },
    {
        category: "Monitoring",
        title: "Recurring Logging and Monitoring Review",
        cadence: "Recurring"
    },
    {
        category: "Monitoring",
        title: "Recurring Production Change Management Review",
        cadence: "Recurring"
    },

    {
        category: "Key Documents",
        title: "Organizational Chart",
        cadence: "Current"
    },
    {
        category: "Key Documents",
        title: "Data Flow & Network Diagrams",
        cadence: "Current"
    },
    {
        category: "Key Documents",
        title: "Risk Register",
        cadence: "Current"
    },
    {
        category: "Key Documents",
        title: "Asset Inventory",
        cadence: "Current"
    },
    {
        category: "Key Documents",
        title: "Threat Intelligence Feeds",
        cadence: "Current"
    },
    {
        category: "Key Documents",
        title: "Vendor Inventory",
        cadence: "Current"
    }
];

const checklist = document.getElementById("checklist");

function renderChecklist() {

    const categories = {};

    checklistItems.forEach((item, index) => {

        if (!categories[item.category]) {
            categories[item.category] = [];
        }

        categories[item.category].push({ ...item, index });
    });

    for (const category in categories) {

        const section = document.createElement("div");
        section.className = "category";

        const heading = document.createElement("h2");
        heading.textContent = category;

        section.appendChild(heading);

        categories[category].forEach(item => {

            const row = document.createElement("label");
            row.className = "checklist-item";

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.dataset.index = item.index;

            checkbox.checked =
                localStorage.getItem(`soc2-item-${item.index}`) === "true";

            checkbox.addEventListener("change", () => {

                localStorage.setItem(
                    `soc2-item-${item.index}`,
                    checkbox.checked
                );

                updateScore();
            });

            const details = document.createElement("div");

            details.innerHTML = `
                <strong>${item.title}</strong>
                <span>${item.cadence}</span>
            `;

            row.appendChild(checkbox);
            row.appendChild(details);

            section.appendChild(row);
        });

        checklist.appendChild(section);
    }
}

function updateScore() {

    const checkboxes =
        document.querySelectorAll('input[type="checkbox"]');

    const completed =
        [...checkboxes].filter(box => box.checked).length;

    const total = checkboxes.length;

    const percentage =
        Math.round((completed / total) * 100);

    document.getElementById("score").textContent =
        `${percentage}%`;

    document.getElementById("completed-count").textContent =
        `${completed} of ${total} activities complete`;

    document.getElementById("progress").style.width =
        `${percentage}%`;

    let message;

    if (percentage === 100) {
        message = "Checklist complete — ready for final review.";
    } else if (percentage >= 75) {
        message = "Strong progress — focus on the remaining gaps.";
    } else if (percentage >= 50) {
        message = "Good progress — several readiness items remain.";
    } else if (percentage > 0) {
        message = "Readiness work is underway.";
    } else {
        message = "Start checking off completed activities.";
    }

    document.getElementById("readiness-message").textContent =
        message;
}

renderChecklist();
updateScore();

// persist org and name details

const organizationInput = document.getElementById("organization");
const preparedByInput = document.getElementById("prepared-by");

organizationInput.value =
    localStorage.getItem("soc2-organization") || "";

preparedByInput.value =
    localStorage.getItem("soc2-prepared-by") || "";

organizationInput.addEventListener("input", () => {
    localStorage.setItem(
        "soc2-organization",
        organizationInput.value
    );
});

preparedByInput.addEventListener("input", () => {
    localStorage.setItem(
        "soc2-prepared-by",
        preparedByInput.value
    );
});

// print and reset buttons

const printButton = document.getElementById("print-button");

printButton.addEventListener("click", () => {
    window.print();
});

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
    const confirmed = window.confirm(
        "Reset the checklist and clear all entered information?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.clear();

    document
        .querySelectorAll('input[type="checkbox"]')
        .forEach(checkbox => {
            checkbox.checked = false;
        });

    document.getElementById("organization").value = "";
    document.getElementById("prepared-by").value = "";

    updateScore();
});