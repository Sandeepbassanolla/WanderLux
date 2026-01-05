document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm()) {
                // Show Custom Modal
                const modal = document.getElementById('successModal');
                if (modal) {
                    modal.classList.add('active');
                }

                form.reset();
                resetValidationStyles();
            }
        });

        // Modal Close Logic
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modal = document.getElementById('successModal');

        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            // Close when clicking outside the box
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // Real-time validation
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            input.addEventListener('input', () => {
                // Remove error style when user starts typing
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorMsg = input.parentElement.querySelector('.error-msg');
                    if (errorMsg) errorMsg.style.display = 'none';
                }
            });
        });
    }

    function validateForm() {
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const date = document.getElementById('date');

        if (!validateField(name)) isValid = false;
        if (!validateField(email)) isValid = false;
        if (!validateField(phone)) isValid = false;
        if (!validateField(date)) isValid = false;

        return isValid;
    }

    function validateField(input) {
        let isValid = true;
        const value = input.value.trim();
        const id = input.id;

        // Reset styles first
        setInputStatus(input, 'success');

        // Required check
        if (value === '') {
            // Message is optional
            if (id === 'message') return true;

            setInputStatus(input, 'error');
            return false;
        }

        // Specific checks
        if (id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setInputStatus(input, 'error');
                return false;
            }
        }

        if (id === 'phone') {
            // Allow digits, spaces, dashes, parentheses, plus
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                setInputStatus(input, 'error');
                return false;
            }
        }

        if (id === 'date') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // reset time part

            if (selectedDate < today) {
                setInputStatus(input, 'error');
                return false;
            }
        }

        return true;
    }

    function setInputStatus(input, status) {
        const parent = input.parentElement;
        const errorMsg = parent.querySelector('.error-msg');

        if (status === 'error') {
            input.classList.add('error');
            input.classList.remove('success');
            if (errorMsg) errorMsg.style.display = 'block';
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            if (errorMsg) errorMsg.style.display = 'none';
        }
    }

    function resetValidationStyles() {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('success', 'error');
        });
    }
});
