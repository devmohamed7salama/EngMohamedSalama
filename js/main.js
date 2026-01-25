
// Back to Top Button Functionality
(function () {
    const backToTopButton = document.getElementById('backToTop');
    const content = document.querySelector('.content');
    const scrollThreshold = 300; // Show button after scrolling 300px

    if (!backToTopButton || !content) return;

    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        if (content.scrollTop > scrollThreshold) {
            backToTopButton.classList.remove('hide');
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
            backToTopButton.classList.add('hide');
        }
    }

    // Smooth scroll to top
    function scrollToTop() {
        content.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    content.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);

    // Initial check
    toggleBackToTopButton();
})();

// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // تحريك النقطة الأساسية
        dot.style.transform = `translate(${posX}px, ${posY}px)`;

        // تحريك الدائرة الخارجية بسلاسة (بإستخدام Animate API لأداء أفضل)
        outline.animate({
            transform: `translate(${posX - 19}px, ${posY - 20}px)`
        }, { duration: 350, fill: "forwards" });
    });

    // تأثير عند الوقوف على اللينكات أو الأزرار
    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.transform = 'scale(1.5)';
            outline.style.borderColor = '#c778dd';
            dot.style.backgroundColor = '#ffc3ff'; // النقطة تقلب أبيض فوق اللينكات
        });
        link.addEventListener('mouseleave', () => {
            outline.style.transform = 'scale(1)';
            dot.style.backgroundColor = '#c778dd';
        });
    });
}


function filterProjects(category, btn) {
    // 1. تحديث شكل الزراير (Active state)
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.classList.remove('active-filter');
    });
    btn.classList.add('active-filter');

    // 2. تحديد الأقسام والرسالة
    const projectSections = document.querySelectorAll('.section-home'); // بيفترض ان دي كلاسات الاقسام
    const soonMessage = document.getElementById('soon-message');

    if (category === 'frontend') {
        // إظهار المشاريع وإخفاء رسالة Soon
        projectSections.forEach(section => section.classList.remove('d-none'));
        soonMessage.classList.add('d-none');
    } else {
        // إخفاء المشاريع وإظهار رسالة Soon (للباك اند والفل ستاك)
        projectSections[0].classList.add('d-none');
        projectSections[1].classList.add('d-none');
        soonMessage.classList.remove('d-none');

        // تفعيل أنيميشن WOW للرسالة عند ظهورها
        new WOW().init();
    }
}

/* START CONTACT FORM SUBMIT LOGIC */
/* START CONTACT FORM SUBMIT LOGIC (FORMSPREE) */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة

            // تغيير حالة الزرار أثناء الإرسال
            submitBtn.disabled = true;
            btnText.innerText = "Sending...";

            const data = new FormData(event.target);

            // إرسال البيانات باستخدام Fetch API
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // في حالة النجاح
                    status.innerHTML = '<span class="text-success border border-success p-2 rounded d-block">Thanks! Your message has been sent.</span>';
                    status.style.display = "block";
                    form.reset(); // تنظيف الفورم
                } else {
                    // في حالة وجود خطأ من السيرفر
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = '<span class="text-danger">Oops! There was a problem.</span>';
                        }
                    });
                }
            }).catch(error => {
                // في حالة وجود خطأ في الاتصال
                status.innerHTML = '<span class="text-danger">Oops! Connection error.</span>';
            }).finally(() => {
                // إعادة الزرار لحالته الطبيعية
                submitBtn.disabled = false;
                btnText.innerText = "Send Message";

                // إخفاء الرسالة بعد 5 ثواني
                setTimeout(() => {
                    status.style.display = "none";
                }, 5000);
            });
        });
    }
});
/* END CONTACT FORM SUBMIT LOGIC */
/* END CONTACT FORM SUBMIT LOGIC */