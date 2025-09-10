API de tâches (Express)
Petite API REST pour gérer des tâches. Données en mémoire.

Installation et démarrage
npm install
npm start

Base URL: http://localhost:3000

GET /
Retourne: "Bienvenue sur mon API de tâches !"

GET /tasks
Liste toutes les tâches

Exemples:
http://localhost:3000/tasks

POST /tasks
Crée une tâche.
{ "title": "Acheter du lait", "completed": 0 }

Note: completed=1 => "completed", sinon "not completed".

PUT /tasks/:id
Met à jour une tâche :
{ "title": "Nouveau titre", "completed": "completed" }

PATCH /tasks/:id
Met à jour une tâche :
Si status complété: message, si non complété, on passe en complété.

DELETE /tasks/:id
Supprime une tâche. Réponse 204 si succès.

Modèle (en mémoire)
{ "id": 1, "title": "Texte", "completed": "completed" }