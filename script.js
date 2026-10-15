document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvpForm');
    const formPanel = document.getElementById('formPanel');
    const loadingPanel = document.getElementById('loadingPanel');
    const successPanel = document.getElementById('successPanel');
    
    const statusText = document.getElementById('statusText');
    const sumRef = document.getElementById('sumRef');
    const sumName = document.getElementById('sumName');
    const sumAff = document.getElementById('sumAff');
    const sumParty = document.getElementById('sumParty');
    const successMsg = document.getElementById('successMsg');
    
    const resetBtn = document.getElementById('resetBtn');
    const calBtn = document.getElementById('calBtn');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const affiliation = document.getElementById('affiliation').value;
            const party = document.getElementById('party').value;
            const code = document.getElementById('code').value.trim();

            // Basic Validation Check
            if (!name || !email || !affiliation || !code) {
                alert('Please complete all required fields and invitation code.');
                return;
            }

            // Switch to immersive loading sequence
            formPanel.classList.add('hidden');
            loadingPanel.classList.remove('hidden');

            const stages = [
                'Verifying invitation credentials...',
                'Checking seating allocation...',
                'Encrypting security tokens...'
            ];
            
            let stageIdx = 0;
            const interval = setInterval(() => {
                stageIdx++;
                if (stageIdx < stages.length) {
                    statusText.textContent = stages[stageIdx];
                }
            }, 500);

            setTimeout(() => {
                clearInterval(interval);
                loadingPanel.classList.add('hidden');
                successPanel.classList.remove('hidden');

                // Generate reference tag
                const refCode = 'CP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                sumRef.textContent = refCode;
                sumName.textContent = name;
                sumAff.textContent = affiliation;
                sumParty.textContent = party + (party > 1 ? ' Seats' : ' Seat');

                // Custom message handling if official media partner
                if (affiliation.includes('Media')) {
                    sumAff.textContent = 'Official Media / Partner (95% Catered Tier)';
                    successMsg.textContent = 'Your official media pass and reservation have been logged. Credentials and access passes have been dispatched to your email.';
                } else {
                    successMsg.textContent = 'Your place at the table has been secured. An invitation confirmation has been sent to your email.';
                }
            }, 1600);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            rsvpForm.reset();
            successPanel.classList.add('hidden');
            formPanel.classList.remove('hidden');
        });
    }

    if (calBtn) {
        calBtn.addEventListener('click', () => {
            const title = encodeURIComponent('The Coral & Palm Soirée');
            const details = encodeURIComponent('Exclusive private afternoon gathering at Loews Coral Gables.');
            const location = encodeURIComponent('Loews Coral Gables, 2 Alhambra Plaza, Coral Gables, FL');
            const dates = '20261114T190000Z/20261115T000000Z'; // 2 PM - 7 PM EST approx
            
            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
            window.open(gCalUrl, '_blank');
        });
    }
});
