// ==========================================
// GENIUS GEMS & JEWELLERY - BESPOKE CUSTOM JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initCustomForm();
});

function initCustomForm() {
    const budgetSlider = document.getElementById('custom-budget');
    const budgetDisplay = document.getElementById('budget-value-display');
    const form = document.getElementById('bespoke-inquiry-form');

    // Update budget slider display in real-time
    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', () => {
            const val = parseInt(budgetSlider.value);
            if (val === 50000) {
                budgetDisplay.textContent = `₹50,000+`;
            } else {
                budgetDisplay.textContent = `₹${val.toLocaleString('en-IN')}`;
            }
        });
    }

    // Form Submit Handler
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Form Values
            const name = document.getElementById('custom-name').value.trim();
            const phone = document.getElementById('custom-phone').value.trim();
            const email = document.getElementById('custom-email').value.trim();
            
            const occasionSelect = document.getElementById('custom-occasion');
            const occasion = occasionSelect.options[occasionSelect.selectedIndex].text;

            const metalSelect = document.getElementById('custom-metal');
            const metal = metalSelect.options[metalSelect.selectedIndex].text;

            const stoneSelect = document.getElementById('custom-stone');
            const gemstone = stoneSelect.options[stoneSelect.selectedIndex].text;

            const budgetVal = parseInt(budgetSlider.value);
            const budget = budgetVal === 50000 ? "₹50,000+" : `₹${budgetVal.toLocaleString('en-IN')}`;

            const vision = document.getElementById('custom-description').value.trim();

            // Format message for WhatsApp
            const waPhone = "919785925876";
            const message = `Hello Genius Gems & Jewellery, I would like to submit a Bespoke Design Inquiry:\n\n*Name*: ${name}\n*WhatsApp*: ${phone}\n*Email*: ${email}\n*Occasion*: ${occasion}\n*Setting Finish*: ${metal}\n*Gemstone Preference*: ${gemstone}\n*Estimated Budget*: ${budget}\n\n*Design Vision*:\n${vision}`;
            
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${waPhone}?text=${encodedMessage}`;

            // Show Toast & Redirect in background
            showToast("Generating WhatsApp Inquiry Link...");
            
            // Redirect after brief delay to let toast display
            setTimeout(() => {
                window.open(waUrl, '_blank');
                form.reset();
                if (budgetDisplay) budgetDisplay.textContent = `₹15,000`;
            }, 1000);
        });
    }
}
