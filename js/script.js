// EmailJS init (runs immediately)
(function() {
  console.log('Loading EmailJS...');
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = function() {
    console.log('EmailJS loaded!');
    emailjs.init('RdaqS8cJeeum-95_g');  // ← REPLACE THIS
    console.log('EmailJS initialized.');
  };
  script.onerror = function() {
    console.error('EmailJS CDN failed to load.');
  };
  document.head.appendChild(script);
})();

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Secure form handling (only if form exists)
  const form = document.querySelector('form');
  if (form && typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');  // Replace with your EmailJS public key

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const honeypot = document.querySelector('input[name="honeypot"]').value;
      if (honeypot) {
        alert('Message not sent.');
        return false;
      }
      
      const name = document.querySelector('input[name="name"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const message = document.querySelector('textarea[name="message"]').value.trim();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return false;
      }
      
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {  // Replace with your service ID and template ID
        name: name,
        email: email,
        message: message
      })
      .then(function(response) {
        alert('Thank you! Your message has been sent. ⭐');
        form.reset();
      }, function(error) {
        console.error('EmailJS ERROR:', error);
        alert('Send failed. Please try again or contact us directly.');
      });
    });
  }
});