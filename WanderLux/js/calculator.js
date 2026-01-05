document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    const resultBox = document.getElementById('result');
    const resultText = document.querySelector('.result-text');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Inputs
            const destination = document.getElementById('destination').value;
            const travellers = parseInt(document.getElementById('travellers').value);
            const days = parseInt(document.getElementById('days').value);
            const style = document.getElementById('style').value;

            // Predefined Logic
            // Base cost per day per person (e.g. food, activities)
            const baseDailyCost = 50;

            // Accommodation per day (per room? assume 2 people per room or per person rate)
            // Let's simplify: Accommodation cost per person per day
            let accommodationCost = 100;

            // Multiplier based on style
            let multiplier = 1;
            let styleLabel = "";

            switch (style) {
                case "Budget":
                    multiplier = 0.8;
                    styleLabel = "Budget Travel Package";
                    break;
                case "Standard":
                    multiplier = 1.2;
                    styleLabel = "Standard Travel Package";
                    break;
                case "Luxury":
                    multiplier = 2.5;
                    styleLabel = "Luxury Travel Package";
                    break;
                default:
                    multiplier = 1;
                    styleLabel = "Standard Travel Package";
            }

            // Calculation
            // Total = (Base + Accom) * Days * Travellers * Multiplier
            // Or as requested: "Daily base cost" + "Accommodation" * Multiplier logic

            // Let's use: Total = ((Base * Travellers) + (Accom * Travellers)) * Days * Multiplier
            const dailyTotal = (baseDailyCost + accommodationCost) * travellers;
            const totalCost = dailyTotal * days * multiplier;

            // Formatting currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            const formattedCost = formatter.format(totalCost);

            // Display Result
            // "Estimated cost for 2 travellers to Bali for 5 days: $2,450 – Standard Travel Package."
            const output = `Estimated cost for ${travellers} traveller${travellers > 1 ? 's' : ''} to ${destination} for ${days} days: ${formattedCost} – ${styleLabel}.`;

            resultText.textContent = output;
            resultBox.classList.add('visible');
        });
    }
});
