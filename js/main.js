// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== TERMINAL ANIMATION =====
const lines = [
  {
    cmd: 'whoami',
    output: [
      '<span class="t-key">name:</span>    <span class="t-val">Kshitiz Kumar</span>',
      '<span class="t-key">role:</span>    <span class="t-val">Full-Stack Developer</span>',
      '<span class="t-key">college:</span> <span class="t-val">IET DAVV, Indore</span>',
      '<span class="t-key">batch:</span>   <span class="t-val">2023–2027</span>',
    ]
  },
  {
    cmd: 'cat skills.txt',
    output: [
      '<span class="t-val">C++ · React · Node · MongoDB · Express</span>',
      '<span class="t-val">Raw Sockets · TCP/IP · Linux · DSA</span>',
    ]
  },
  {
    cmd: 'echo $STATUS',
    output: [
      '<span class="t-val">✓ Open to internships & fresher roles</span>',
    ]
  }
];

let lineIdx = 0;
let charIdx = 0;
let outputIdx = 0;
let phase = 'typing'; // typing | outputting | waiting
const cmdEl = document.getElementById('termCmd');
const outputEl = document.getElementById('termOutput');

function runTerminal() {
  const current = lines[lineIdx];

  if (phase === 'typing') {
    if (charIdx < current.cmd.length) {
      cmdEl.textContent += current.cmd[charIdx++];
      setTimeout(runTerminal, 60 + Math.random() * 40);
    } else {
      phase = 'outputting';
      outputIdx = 0;
      setTimeout(runTerminal, 300);
    }
  } else if (phase === 'outputting') {
    if (outputIdx < current.output.length) {
      const p = document.createElement('p');
      p.innerHTML = current.output[outputIdx++];
      outputEl.appendChild(p);
      setTimeout(runTerminal, 150);
    } else {
      phase = 'waiting';
      setTimeout(runTerminal, 2000);
    }
  } else if (phase === 'waiting') {
    // Reset for next command
    cmdEl.textContent = '';
    outputEl.innerHTML = '';
    charIdx = 0;
    lineIdx = (lineIdx + 1) % lines.length;
    phase = 'typing';
    setTimeout(runTerminal, 200);
  }
}

setTimeout(runTerminal, 800);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');

// IMPORTANT: Change this URL after deploying your backend
const BACKEND_URL = 'http://localhost:5000/api/contact';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) return;

  // Show loading
  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  status.className = 'form-status hidden';

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className = 'form-status success';
      form.reset();
    } else {
      throw new Error(data.error || 'Something went wrong');
    }
  } catch (err) {
    status.textContent = '✗ Failed to send. Try emailing directly at kshitizashok2@gmail.com';
    status.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  }
});

// ===== SCROLL REVEAL (simple, no library) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-group, .card-inner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
