document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('embedForm');
    const clearBtn = document.getElementById('clearBtn');
    const container = document.getElementById('manywho');
    const statusBadge = document.getElementById('statusBadge');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const tenantId = document.getElementById('tenantId').value.trim();
        const flowId = document.getElementById('flowId').value.trim();
        let versionId = document.getElementById('versionId').value.trim();

        // Standardize empty version ID to match Boomi requirements
        if (!versionId) versionId = '';

        // Clear container before initializing new embed
        resetContainer();

        try {
            // Update UI status
            statusBadge.textContent = 'Status: Initializing...';
            statusBadge.className = 'badge active';

            // Define standard Boomi options
            const options = {
                authentication: {
                    sessionId: '',
                    sessionUrl: ''
                },
                navigationElementId: '',
                mode: '',
                reportingMode: '',
                trackLocation: false,
                appendEtag: true,
                history: false,
                collaboration: {
                    isEnabled: false
                },
                inputs: null,
                annotations: null,
                collapsible: true,
                isFullWidth: true
            };

            // Initialize the Boomi (ManyWho) engine
            manywho.engine.initialize(
                tenantId,
                flowId,
                versionId,
                'main',
                'https://flow.boomi.com',
                'https://flow.boomi.com',
                options
            );

            statusBadge.textContent = 'Status: Active';

        } catch (error) {
            console.error('Error initializing Boomi Embed:', error);
            statusBadge.textContent = 'Status: Error';
            statusBadge.className = 'badge idle';
            alert('Failed to initialize the embed. Check the console for details.');
        }
    });

    clearBtn.addEventListener('click', () => {
        resetContainer();
        document.getElementById('tenantId').value = '';
        document.getElementById('flowId').value = '';
        document.getElementById('versionId').value = '';
    });

    function resetContainer() {
        // Empty the container and restore the placeholder
        container.innerHTML = '<div class="placeholder-text">The embedded UI will render here.</div>';
        statusBadge.textContent = 'Status: Idle';
        statusBadge.className = 'badge idle';
    }
});
