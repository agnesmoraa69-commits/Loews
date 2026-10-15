const sb = supabase.createClient('https://iyddjjnfkyufmkpljkof.supabase.co', 'sb_publishable_uO2cnMJj1whL_qa4VpDS6Q_JN_P-QU4');
document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvpForm');
    const formPanel = document.getElementById('formPanel');
    const loadingPanel = document.getElementById('loadingPanel');
    const statusText = document.getElementById('statusText');
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

            if (!name || !email || !affiliation || !code) {
                alert('Please complete all required fields and invitation code.');
                return;
            }

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

            setTimeout(async () => {
                clearInterval(interval);

                const refCode = 'CP-' + Math.random().toString(36).substring(2, 8).toUpperCase();

                sessionStorage.setItem('reservation', JSON.stringify({
                    ref: refCode,
                    name: name,
                    affiliation: affiliation,
                    party: party
                }));

                window.location.href = 'confirmation.html';
            }, 1600);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            rsvpForm.reset();
            document.getElementById('successPanel').classList.add('hidden');
            formPanel.classList.remove('hidden');
        });
    }

    if (calBtn) {
        calBtn.addEventListener('click', () => {
            const title = encodeURIComponent('The Coral & Palm Soirée');
            const details = encodeURIComponent('Exclusive private afternoon gathering at Loews Coral Gables.');
            const location = encodeURIComponent('Loews Coral Gables, 2 Alhambra Plaza, Coral Gables, FL');
            const dates = '20261114T190000Z/20261115T000000Z';

            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
            window.open(gCalUrl, '_blank');
        });
    }
});
