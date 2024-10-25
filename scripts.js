// Animation du titre
gsap.from("header h1", {duration: 1, y: -50, opacity: 0});


// Animation de la photo de profil
gsap.from(".profile-photo", {duration: 1, x: -100, opacity: 0});

// Animation des projets à l'apparition
gsap.from(".project", {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.3
});

// Animation au survol des projets
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('mouseenter', () => {
    gsap.to(project, {duration: 0.3, scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.2)"});
  });
  project.addEventListener('mouseleave', () => {
    gsap.to(project, {duration: 0.3, scale: 1, boxShadow: "0 2px 5px rgba(0,0,0,0.1)"});
  });
});

// Animation au survol du titre
const headerTitle = document.querySelector('header h1');
headerTitle.addEventListener('mouseenter', () => {
  gsap.to(headerTitle, {duration: 0.3, scale: 1.05, color: "#e0f7f4"});
});
headerTitle.addEventListener('mouseleave', () => {
  gsap.to(headerTitle, {duration: 0.3, scale: 1, color: "white"});
});

// Fonction pour gérer la soumission du formulaire
function submitForm(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  const form = event.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'block';
    if (response.ok) {
      messageBox.className = 'success';
      messageBox.innerText = 'Merci, votre message a été envoyé.';
      form.reset();
    } else {
      response.json().then(data => {
        messageBox.className = 'error';
        messageBox.innerText = data.errors ? data.errors.map(error => error.message).join(", ") : 'Erreur lors de l\'envoi.';
      });
    }
  })
  .catch(() => {
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'block';
    messageBox.className = 'error';
    messageBox.innerText = 'Erreur lors de l\'envoi.';
  });
}
