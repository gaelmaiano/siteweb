

    // Animation d'apparition avec GSAP
    gsap.from(textMesh.position, { duration: 1, y: -5, opacity: 0 });
});

// Configuration des lumières
const ambientLight = new THREE.AmbientLight(0x404040); // Lumière ambiante
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);
    if (textMesh) { // Vérifie si textMesh est défini
        textMesh.rotation.y += 0.01; // Rotation continue
    }
    renderer.render(scene, camera);
}
animate();

// Animation du titre
gsap.from("header h1", { duration: 1, y: -50, opacity: 0 });

// Animation de la photo de profil
gsap.from(".profile-photo", { duration: 1, x: -100, opacity: 0 });

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
        gsap.to(project, { duration: 0.3, scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.2)" });
    });
    project.addEventListener('mouseleave', () => {
        gsap.to(project, { duration: 0.3, scale: 1, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" });
    });
});

// Animation au survol du titre
const headerTitle = document.querySelector('header h1');
headerTitle.addEventListener('mouseenter', () => {
    gsap.to(headerTitle, { duration: 0.3, scale: 1.05, color: "#e0f7f4" });
});
headerTitle.addEventListener('mouseleave', () => {
    gsap.to(headerTitle, { duration: 0.3, scale: 1, color: "white" });
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

// Assurez-vous d'attacher la fonction submitForm à votre formulaire
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', submitForm);
}
