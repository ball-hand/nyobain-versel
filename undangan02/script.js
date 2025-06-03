document.addEventListener('DOMContentLoaded', () => {
    const openInvitationBtn = document.getElementById('open-invitation');
    const heroSection = document.querySelector('.hero');
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('.fade-in');
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');
    const copyButtons = document.querySelectorAll('.copy-button');

    // Dapatkan elemen audio dan tombol musik
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-btn');
    const playIcon = document.querySelector('#music-toggle-btn .play-icon');
    const pauseIcon = document.querySelector('#music-toggle-btn .pause-icon');

    let isPlaying = false; // Status awal musik

    // Sembunyikan tombol musik di awal (Sudah diset di HTML dengan style="display:none;")
    // musicToggleButton.style.display = 'none'; // Anda bisa hapus baris ini jika sudah di HTML

    openInvitationBtn.addEventListener('click', () => {
        heroSection.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.style.overflow = 'visible'; // Izinkan scroll setelah dibuka

        mainContent.scrollIntoView({ behavior: 'smooth' });

        // Tampilkan tombol musik setelah undangan dibuka
        if (musicToggleButton) {
            musicToggleButton.style.display = 'flex'; // Menggunakan flex agar icon di tengah
        }

        // Coba putar musik secara otomatis
        if (backgroundMusic) {
            backgroundMusic.play()
                .then(() => {
                    isPlaying = true;
                    // Tampilkan ikon pause, sembunyikan ikon play
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'inline-block';
                })
                .catch(e => {
                    console.warn("Autoplay prevented, user needs to interact for music:", e);
                    // Jika autoplay diblokir, pastikan ikon play terlihat
                    isPlaying = false;
                    if (playIcon) playIcon.style.display = 'inline-block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                });
        }

        setTimeout(() => {
            checkScrollForFadeIn();
        }, 100);
    });

    // Event listener untuk tombol musik
    if (musicToggleButton) {
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic) {
                if (isPlaying) {
                    backgroundMusic.pause();
                    if (playIcon) playIcon.style.display = 'inline-block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                } else {
                    backgroundMusic.play();
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'inline-block';
                }
                isPlaying = !isPlaying; // Balik status
            }
        });
    }

    // ... (kode JavaScript lainnya, seperti countdown dan fade-in) ...
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('June 22, 2025 07:00:00').getTime(); // Contoh: Ganti dengan tanggal acara Anda

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
    updateCountdown();

    const checkScrollForFadeIn = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (sectionTop < viewportHeight * 0.8) {
                section.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkScrollForFadeIn);

    if (mainContent.style.display === 'block') {
        checkScrollForFadeIn();
    }

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;
        rsvpMessage.textContent = `Terima kasih, ${name}! Kami mencatat Anda ${attendance === 'hadir' ? 'akan hadir' : 'tidak dapat hadir'}.`;
        rsvpMessage.style.display = 'block';
        rsvpForm.reset();
        setTimeout(() => {
            rsvpMessage.style.display = 'none';
        }, 5000);
    });

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