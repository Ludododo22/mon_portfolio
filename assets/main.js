// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect + active nav highlighting
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 100);
        }

        // Active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate skills on scroll with percentage counter
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const targetWidth = parseInt(bar.getAttribute('data-width'), 10);
                            if (isNaN(targetWidth)) return;

                            const skillItem = bar.closest('.skill-item');
                            if (!skillItem) return;

                            const percentageElement = skillItem.querySelector('.skill-percentage');
                            bar.style.width = '0%'; // Reset before animating

                            let currentPercent = 0;
                            const duration = 1500; // ms
                            const startTime = performance.now();

                            const animate = (timestamp) => {
                                const elapsed = timestamp - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                currentPercent = progress * targetWidth;

                                bar.style.width = `${currentPercent}%`;
                                if (percentageElement) {
                                    percentageElement.textContent = Math.round(currentPercent) + '%';
                                }

                                if (progress < 1) {
                                    requestAnimationFrame(animate);
                                }
                            };

                            requestAnimationFrame(animate);
                        }, index * 150);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);
    }

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => projectObserver.observe(card));
    }

    // Primary button scroll action
    const primaryBtn = document.querySelector('.btn-primary');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function () {
            const projectsSection = document.querySelector('#projets');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // PDF Modal
    const pdfModal = document.getElementById('pdfModal');
    const showPdfBtn = document.getElementById('showPdfBtn');
    const closeBtn = pdfModal ? pdfModal.querySelector('.pdf-modal-close') : null;

    if (pdfModal && showPdfBtn) {
        showPdfBtn.addEventListener('click', () => {
            pdfModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    const closeModal = () => {
        if (pdfModal) {
            pdfModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (pdfModal) {
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) closeModal();
        });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const prenom = formData.get('prenom')?.trim();
            const nom = formData.get('nom')?.trim();
            const sujet = formData.get('sujet')?.trim();
            const message = formData.get('message')?.trim();

            if (!prenom || !nom || !sujet || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            alert(`Merci ${prenom} ${nom} ! Votre message a été envoyé avec succès.`);
            this.reset();
        });
    }

    // Input focus effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });

    console.log('🚀 Portfolio moderne chargé avec succès !');
});