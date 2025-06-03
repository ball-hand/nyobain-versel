document.addEventListener('DOMContentLoaded', () => {
    const openInvitationBtn = document.getElementById('open-invitation');
    const heroSection = document.querySelector('.hero');
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('.fade-in');
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');
    const copyButtons = document.querySelectorAll('.copy-button');

    // Function to open the invitation and play background music
    openInvitationBtn.addEventListener('click', () => {
        heroSection.style.display = 'none'; // Sembunyikan bagian hero
        mainContent.style.display = 'block'; // Tampilkan konten utama
        document.body.style.overflow = 'visible'; // Izinkan scroll setelah dibuka

        // Smooth scroll to the top of the main content
        mainContent.scrollIntoView({ behavior: 'smooth' });

        // Optional: Play background music (uncomment and replace with your audio file)
        // const audio = new Audio('your-background-music.mp3');
        // audio.loop = true;
        // audio.play().catch(e => console.error("Autoplay prevented:", e));

        // Trigger fade-in for visible sections
        setTimeout(() => {
            checkScrollForFadeIn();
        }, 100); // Give a small delay to ensure content is rendered
    });

    // Function for fade-in effect on scroll
    const checkScrollForFadeIn = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (sectionTop < viewportHeight * 0.8) { // Adjust this value as needed
                section.classList.add('active');
            }
        });
    };

    // Listen for scroll events to trigger fade-in
    window.addEventListener('scroll', checkScrollForFadeIn);

    // Initial check for fade-in when page loads (if main content is already visible)
    if (mainContent.style.display === 'block') {
        checkScrollForFadeIn();
    }


    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('[Bulan] [Tanggal], [Tahun] [Waktu Akad]').getTime(); // Example: 'Dec 25, 2025 09:00:00'

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            countdownElement.innerHTML = "Acara telah berlangsung!";
            clearInterval(countdownInterval);
        } else {
            countdownElement.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call immediately to avoid 1-second delay


    // RSVP Form Submission (Client-side simulation)
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // In a real application, you'd send this data to a server (e.g., Google Sheets, Netlify Forms, custom backend)
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;

        // Simulate successful submission
        rsvpMessage.textContent = `Terima kasih, ${name}! Kami mencatat Anda ${attendance === 'hadir' ? 'akan hadir' : 'tidak dapat hadir'}.`;
        rsvpMessage.style.display = 'block';
        rsvpForm.reset(); // Clear the form

        // Hide message after a few seconds
        setTimeout(() => {
            rsvpMessage.style.display = 'none';
        }, 5000);
    });

    // Copy to Clipboard functionality for bank/e-wallet details
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.text;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Disalin!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});