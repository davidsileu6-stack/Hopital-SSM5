// LOGIN
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login-section");
const dashboard = document.getElementById("medecin-dashboard");
const loginError = document.getElementById("login-error");

// identifiant par défaut : admin/admin
loginForm.addEventListener("submit", function(e){
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === "admin" && password === "admin"){
    loginSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadRdv(); // charger les rendez-vous
  } else {
    loginError.textContent = "Nom utilisateur ou mot de passe incorrect.";
  }
});

// GESTION DES DISPONIBILITÉS
const dispoForm = document.getElementById("disponibilite-form");
const dispoTableBody = document.querySelector("#disponibilites-table tbody");

dispoForm.addEventListener("submit", function(e){
  e.preventDefault();
  const jour = document.getElementById("jour").value;
  const debut = document.getElementById("heureDebut").value;
  const fin = document.getElementById("heureFin").value;

  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${jour}</td><td>${debut}</td><td>${fin}</td>`;
  dispoTableBody.appendChild(tr);

  dispoForm.reset();
});

// GESTION DES RENDEZ-VOUS
function loadRdv() {
  const rdvTableBody = document.querySelector("#rdv-table tbody");

  // Pour le moment on récupère les infos depuis localStorage
  // Si index.html stocke les infos dans localStorage lors de soumission
  const rdvs = JSON.parse(localStorage.getItem("rdvs")) || [];

  rdvTableBody.innerHTML = ""; // vider tableau
  rdvs.forEach(rdv => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${rdv.nom}</td>
      <td>${rdv.email}</td>
      <td>${rdv.symptomes}</td>
      <td>${rdv.date}</td>
      <td>${rdv.heure}</td>
      <td>${rdv.telephone || ""}</td>
    `;
    rdvTableBody.appendChild(tr);
  });
}
