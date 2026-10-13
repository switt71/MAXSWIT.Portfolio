/**
 * PORTFOLIO - CREATIVE MEDIA (สื่อนฤมิต)
 * JavaScript Interactions & Components
 * Author: Maxswit
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================================
  // 0. จัดการข้อความ & โซเชียลมีเดียใน Footer ส่วนกลาง (แก้ไขที่นี่ที่เดียว มีผลทุกหน้า)
  // =========================================================================
  const footerConfig = {
                                             // ปี ค.ศ.
    title: 'Swit Wongsing. All Rights Reserved',           // ข้อความลิขสิทธิ์
    designedBy: 'Swit Wongsing',                           // ผู้จัดทำ / ออกแบบ (ใส่ชื่อหรือเว้นว่าง '' ได้)
    
    // รายการโซเชียลมีเดียใน Footer (แก้ไข URL, เปลี่ยน icon หรือเพิ่ม/ลบ ได้ตามต้องการ)
    socials: [
      { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/switt71' },
      { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/Max.Sswit.7148' },
      { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/swswitt/?hl=en' },
    ]
  };

  function renderGlobalFooter() {
    const footers = document.querySelectorAll('footer.footer-custom, #globalFooter');
    
    // สร้าง HTML สำหรับปุ่ม Social Media ใน Footer
    const socialHtml = footerConfig.socials && footerConfig.socials.length > 0
      ? `<div class="footer-social-links">
          ${footerConfig.socials.map(item => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="footer-social-btn" title="${item.name}" aria-label="${item.name}">
              <i class="${item.icon}"></i>
            </a>
          `).join('')}
        </div>`
      : '';

    // สร้าง HTML สำหรับ Designed by (ถ้ามีการระบุ)
    const designerHtml = footerConfig.designedBy
      ? `<p class="footer-designer mt-1">Designed by <span>${footerConfig.designedBy}</span></p>`
      : '';

    footers.forEach(footer => {
      footer.innerHTML = `
        <div class="container">
          ${socialHtml}
          <p class="footer-copy">© Copyright  ${footerConfig.title}</p>
          ${designerHtml}
        </div>
      `;
    });
  }

  // เรียกใช้ฟังก์ชันแสดงผล Footer ทันที
  renderGlobalFooter();

  // -------------------------------------------------------------------------
  // 1. Navigation Sticky Background on Scroll
  // -------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-custom');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('active');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('active');
    }
  });

  // -------------------------------------------------------------------------
  // 2. Back to Top Button
  // -------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. Highlight Active Navigation Item based on Current Page URL
  // -------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (currentPath === 'index.html' && href === './index.html') {
      link.classList.add('active');
    }
  });

  // -------------------------------------------------------------------------
  // 4. Portfolio Filter System
  // -------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Project Modal Quick View
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      if (!button) return;

      const title = button.getAttribute('data-title') || 'ชื่อผลงาน';
      const category = button.getAttribute('data-category-name') || 'หมวดหมู่';
      const description = button.getAttribute('data-desc') || 'คำอธิบายผลงานสื่อนฤมิต';
      const software = button.getAttribute('data-software') || 'Blender, Unreal Engine, Premiere Pro';
      const imgSrc = button.getAttribute('data-img') || '';

      const modalTitle = projectModal.querySelector('#modalProjectTitle');
      const modalCategory = projectModal.querySelector('#modalProjectCategory');
      const modalDesc = projectModal.querySelector('#modalProjectDesc');
      const modalSoftware = projectModal.querySelector('#modalProjectSoftware');
      const modalImg = projectModal.querySelector('#modalProjectImg');

      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.textContent = description;
      if (modalSoftware) modalSoftware.textContent = software;
      if (modalImg && imgSrc) modalImg.src = imgSrc;
    });
  }

  // -------------------------------------------------------------------------
  // 6. Interactive Contact Form Submission Handler
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !subject || !message) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
        return;
      }

      // Simulate sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>กำลังส่งข้อมูล...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
          setTimeout(() => {
            formSuccessAlert.classList.add('d-none');
          }, 6000);
        } else {
          alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด');
        }
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 7. Auto close mobile navbar when link clicked
  // -------------------------------------------------------------------------
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
});

