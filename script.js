const checklistItems = [
    {
        category: "Governance",
        title: "Annual Risk Assessment",
        cadence: "Annual",
        control: "CC3.2"
    },
    {
        category: "Governance",
        title: "Annual Policy Review",
        cadence: "Annual",
        control: "CC2.1"
    },
    {
        category: "Governance",
        title: "Security Awareness Training",
        cadence: "Annual",
        control: "CC2.2"
    },

    {
        category: "Access Management",
        title: "User Access Review",
        cadence: "Quarterly",
        control: "CC6.2"
    },
    {
        category: "Access Management",
        title: "Privileged Access Review",
        cadence: "Quarterly",
        control: "CC6.2"
    },
    {
        category: "Access Management",
        title: "Terminated User Access Review",
        cadence: "Ongoing",
        control: "CC6.3"
    },

    {
        category: "Security Testing",
        title: "External Penetration Test",
        cadence: "Annual",
        control: "CC7.1"
    },
    {
        category: "Security Testing",
        title: "Vulnerability Scanning",
        cadence: "Recurring",
        control: "CC7.1"
    },
    {
        category: "Security Testing",
        title: "Vulnerability Remediation Review",
        cadence: "Recurring",
        control: "CC7.2"
    },

    {
        category: "Incident Response",
        title: "Incident Response Plan Review",
        cadence: "Annual",
        control: "CC7.4"
    },
    {
        category: "Incident Response",
        title: "Incident Response Tabletop Exercise",
        cadence: "Annual",
        control: "CC7.4"
    },

    {
        category: "Business Continuity",
        title: "Business Continuity / Disaster Recovery Test",
        cadence: "Annual",
        control: "A1.2"
    },
    {
        category: "Business Continuity",
        title: "Backup Restoration Test",
        cadence: "Annual",
        control: "A1.2"
    },

    {
        category: "Vendor Management",
        title: "Critical Vendor Risk Reviews",
        cadence: "Annual",
        control: "CC9.2"
    },
    {
        category: "Vendor Management",
        title: "Vendor Inventory Review",
        cadence: "Annual",
        control: "CC9.2"
    },

    {
        category: "Change Management",
        title: "Production Change Review",
        cadence: "Recurring",
        control: "CC8.1"
    },

    {
        category: "Monitoring",
        title: "Security Alert Review",
        cadence: "Recurring",
        control: "CC7.2"
    },
    {
        category: "Monitoring",
        title: "Logging and Monitoring Review",
        cadence: "Recurring",
        control: "CC7.2"
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
                <span>
                    ${item.cadence} · ${item.control}
                </span>
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