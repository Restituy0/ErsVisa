/* Basic client-side validation for the "Book Appointment" form.
   Doesn't replace server-side validation (formsubmit.co already
   enforces the "required" fields), but improves feedback before
   submitting. */
(function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const phoneInput = document.getElementById('phone');
    const phoneGroup = phoneInput ? phoneInput.closest('.form-group') : null;
    const phonePattern = /^[0-9+\-()\s]{7,20}$/;

    form.addEventListener('submit', (e) => {
        let valid = true;

        if (phoneInput && phoneGroup) {
            const ok = phonePattern.test(phoneInput.value.trim());
            phoneGroup.classList.toggle('invalid', !ok);
            if (!ok) valid = false;
        }

        if (!valid) {
            e.preventDefault();
        }
    });

    if (phoneInput && phoneGroup) {
        phoneInput.addEventListener('input', () => {
            phoneGroup.classList.remove('invalid');
        });
    }
})();
