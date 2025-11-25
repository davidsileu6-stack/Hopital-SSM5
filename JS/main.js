document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       RÉCUPÉRATION DES ÉLÉMENTS (MIS À JOUR)
       ==========================================================*/
    
    // Éléments du formulaire et des sections
    const rdvForm = document.querySelector('.rdv-form'); // Utilisation de la classe du formulaire
    const formSection = document.getElementById('prendre-rdv'); // ID du formulaire
    
    // Sections et boutons Médecins
    const medecinsSection = document.getElementById('medecin-selection'); 
    const medecinButtons = document.querySelectorAll('.med-btn'); // Classe des nouveaux boutons
    
    // Sections et options Paiement
    const paymentSection = document.getElementById('paiement-section'); 
    const paymentOptions = document.querySelectorAll('.payment-option'); // Classe des boutons OM/MoMo
    
    // Section Confirmation
    const confirmationSection = document.getElementById('confirmation-section'); 
    const confirmationMsg = document.getElementById('confirmation-message'); 
    const startCallBtn = document.getElementById('call-link'); // Lien de l'appel

    // Variables de l'application
    let selectedMedecin = '';
    let patientName = '';
    let patientPhone = '';
    let medecinSolde = 0; // Simulation du solde

    /* ==========================================================
       ÉTAPE 1 : FORMULAIRE PATIENT (MISE À JOUR)
       ==========================================================*/
    rdvForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nomInput = document.getElementById('nom');
        const phoneInput = document.getElementById('phone');

        // Récupération et vérification (simplifiée) des données
        if (nomInput.value && phoneInput.value) {
            patientName = nomInput.value;
            patientPhone = phoneInput.value;

            // Masque le formulaire et affiche la sélection des médecins
            formSection.classList.add('hidden');
            medecinsSection.classList.remove('hidden');
            
            // Scroll doux vers la section des médecins
            medecinsSection.scrollIntoView({ behavior: 'smooth' });

        } else {
            alert('Veuillez remplir au moins le nom et le téléphone.');
        }
    });

    //---

    /* ==========================================================
       ÉTAPE 2 : CHOIX DU MÉDECIN
       ==========================================================*/
    medecinButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            // 1. Enregistre et met à jour l'état visuel du bouton
            // On extrait le nom du <strong> dans le bouton
            selectedMedecin = button.querySelector('strong').textContent; 
            medecinButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected'); // Ajoute la classe 'selected' pour l'effet visuel
            
            // 2. Masque les médecins et affiche la section paiement
            medecinsSection.classList.add('hidden');
            paymentSection.classList.remove('hidden');

            // Scroll automatique vers la section de paiement
            paymentSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    //---

    /* ==========================================================
       ÉTAPE 3 : PAIEMENT OM / MOMO (REFACTORISÉ)
       ==========================================================*/
    paymentOptions.forEach(optionBtn => {
        optionBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Gestion de l'état Actif (pour l'effet de couleur Jaune/Orange)
            paymentOptions.forEach(b => b.classList.remove('active'));
            optionBtn.classList.add('active');

            const paymentMethod = optionBtn.dataset.method;

            // 2. Simulation du processus de paiement (Délai d'une seconde pour simuler la transaction)
            setTimeout(() => {
                
                // Mettez ici votre appel d'API réel
                console.log(`Paiement simulé réussi via ${paymentMethod.toUpperCase()}.`);

                // 3. Logique de confirmation
                medecinSolde += 2000;

                paymentSection.classList.add('hidden');
                confirmationSection.classList.remove('hidden'); // Affiche la confirmation

                // Génération de l'heure du rendez-vous (5 minutes plus tard)
                const rendezVousDate = new Date();
                rendezVousDate.setMinutes(rendezVousDate.getMinutes() + 5);
                
                confirmationMsg.innerHTML = 
                    `<i class="fa-solid fa-check-circle success-icon"></i><br>
                    Félicitations **${patientName}** ! Votre téléconsultation avec le **Dr ${selectedMedecin}** est programmée pour le **${rendezVousDate.toLocaleString()}** (Heure Cameroun).`;

                confirmationSection.scrollIntoView({ behavior: 'smooth' });

            }, 1000); 
        });
    });

    //---

    /* ==========================================================
       ÉTAPE 4 : APPEL VIDÉO (UTILISATION DE JITSI)
       ==========================================================*/
    startCallBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simuler le lancement de l'appel
        // Le lien est généré pour correspondre au rendez-vous
        const meetingID = `ssm5-teleconsultation-${Date.now()}`;
        
        // Mettez ici l'URL de votre plateforme de visio
        window.open(`https://meet.jit.si/${meetingID}`, '_blank');
    });

    //---

    /* ==========================================================
       SLIDER D'ARRIÈRE-PLAN (VOTRE CODE INITIAL)
       ==========================================================*/
    const images = [
        "assets/images/1.jpg",
        "assets/images/2.jpg",
        "assets/images/3.jpg",
        "assets/images/4.jpg",
        "assets/images/5.jpg"
    ];

    let current = 0;
    const slider = document.getElementById("background-slider");

    function changeBackground() {
        slider.style.backgroundImage = `url(${images[current]})`;
        current = (current + 1) % images.length;
    }

    // Lance le slider
    changeBackground();
    setInterval(changeBackground, 5000);
    
    // BONUS : Remise à zéro hebdomadaire du solde médecin (votre logique)
    setInterval(() => {
        let d = new Date().getDay();
        if (d === 1) { // Lundi
            medecinSolde = 0;
            console.log("Solde médecin remis à zéro (paiement hebdo effectué).");
        }
    }, 60000); // Vérifie chaque minute

});