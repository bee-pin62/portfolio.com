// Smooth scrolling and active section tracking
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-links');
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.querySelector('.comments-container');

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            if(window.innerWidth <= 768) {
                navList.classList.remove('active');
            }
        });
    });

    // Intersection Observer for active section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Comment system
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const text = document.getElementById('comment-text').value;
        
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <h4>${name}</h4>
            <p>${text}</p>
            <button class="reply-btn">Reply</button>
        `;
        
        commentsContainer.appendChild(comment);
        commentForm.reset();
    });

    // Copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
            navList.classList.remove('active');
        }
    });
});