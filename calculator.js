const fuelTypes = [
    { name: "Diesel", unit: "liters" },
    { name: "Gasoline", unit: "liters" },
    { name: "LPG", unit: "liters" },
    { name: "NG", unit: "cubic meters" },
    { name: "Light Fuel Oil", unit: "liters" },
    { name: "Heavy Fuel Oil", unit: "liters" },
    { name: "Base Oil", unit: "liters" },
    { name: "Used Oil", unit: "liters" }
];

document.addEventListener("DOMContentLoaded", () => {
    const fuelForm = document.getElementById("fuel-form");
    const addFuelButton = document.getElementById("add-fuel");
    const resultsContainer = document.getElementById("results");
    const workingDaysInput = document.getElementById("working-days");
    
    addFuelButton.addEventListener("click", addFuelEntry);
    fuelForm.addEventListener("submit", calculateConsumption);

    function addFuelEntry() {
        const fuelEntry = document.createElement("div");
        fuelEntry.classList.add("fuel-entry");
        fuelEntry.innerHTML = `
            <select class="fuel-type">
                ${fuelTypes.map(fuel => `<option value="${fuel.name}">${fuel.name}</option>`).join('')}
            </select>
            <input type="number" class="fuel-amount" placeholder="Amount (${fuelTypes[0].unit})" required>
            <input type="number" class="fuel-cost" placeholder="Cost" required>
            <button type="button" class="remove-fuel">Remove</button>
        `;
        fuelEntry.querySelector(".remove-fuel").addEventListener("click", () => {
            fuelEntry.remove();
        });
        fuelForm.insertBefore(fuelEntry, addFuelButton);
    }

    function calculateConsumption(event) {
        event.preventDefault();
        const fuelEntries = document.querySelectorAll(".fuel-entry");
        let totalConsumption = 0;
        let totalCost = 0;

        fuelEntries.forEach(entry => {
            const fuelType = entry.querySelector(".fuel-type").value;
            const amount = parseFloat(entry.querySelector(".fuel-amount").value);
            const cost = parseFloat(entry.querySelector(".fuel-cost").value);
            totalConsumption += amount;
            totalCost += cost;
        });

        const workingDays = parseInt(workingDaysInput.value);
        const dailyConsumption = totalConsumption / workingDays;

        resultsContainer.innerHTML = `
            <h3>Results</h3>
            <p>Total Consumption: ${totalConsumption} liters</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
            <p>Daily Consumption: ${dailyConsumption.toFixed(2)} liters</p>
        `;
    }
});