// Vérification de session
const session = JSON.parse(localStorage.getItem("session_medecin"));

if (!session) {
    window.location.href = "medecin.html";
}

// Affichage du nom
document.getElementById("welcome").textContent =
    "Bienvenue, Dr " + session.username;

// Bouton déconnexion
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("session_medecin");
    window.location.href = "medecin.html";
});

// CHARGER LES RENDEZ-VOUS
function chargerRDV() {
    fetch("http://localhost:3000/patients")
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#rdv-table tbody");
            tbody.innerHTML = "";

            data.forEach(p => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nom}</td>
                    <td>${p.phone}</td>
                    <td>${p.medecin}</td>
                    <td>${p.date_consultation}</td>
                `;
                tbody.appendChild(tr);
            });

            genererGraphique(data);
        });
}

chargerRDV();

// GENERER GRAPHIQUE DES GAINS
function genererGraphique(data) {
    //  pour la démo chaque rdv = 1500f
    let gains = {};

    data.forEach(rdv => {
        const jour = rdv.date_consultation;
        if (!gains[jour]) gains[jour] = 0;
        gains[jour] += 1500;
    });

    const labels = Object.keys(gains);
    const valeurs = Object.values(gains);

    const ctx = document.getElementById("gainChart");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Gains (FCFA)",
                data: valeurs,
                borderWidth: 2
            }]
        }
    });
}
