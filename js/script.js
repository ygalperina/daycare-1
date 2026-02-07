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

// Smooth scrolling (unchanged)
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

  // Form submission with debug
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const message = document.querySelector('textarea[name="message"]').value;
      
      console.log('Form data:', { name, email, message });  // Debug log
      
      if (name && email && message) {
        console.log('Sending via EmailJS...');
        emailjs.send('service_w65e2fv', 'template_25rka9n', {  // ← REPLACE THESE
          name: name,
          email: email,
          message: message
        })
        .then(function(response) {
          console.log('SUCCESS:', response.status, response.text);
          alert('Thank you! Your message has been sent. ⭐ Check your email.');
          form.reset();
        }, function(error) {
          console.error('EmailJS ERROR:', error);
          alert('Send failed. Check console (F12) or email directly.');
        });
      } else {
        alert('Please fill all fields.');
      }
    });
  } else {
    console.error('No form found!');
  }
});