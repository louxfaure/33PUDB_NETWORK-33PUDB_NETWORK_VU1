# Package de personnalisation de la vue réseau de Primo VE / Babord+ du REBUB 
Personnalisations Angular et CSS de la vue
## Composant `prmTopbarAfter`

Le composant `prmTopbarAfter` a été développé pour les besoin de la migration de Primo BO vers Primi VE. Tous les liens d'accès à Primo BO on été redirgé vers la vue duv réseau. Le composant est utilisé pour afficher un message de redirection au niveau la barre supérieure (topbar) de l'interface utilisateur dans Primo VE. Il offre des liens de redirection vers les catalogues de chaque institution en reprenant les éléments de la requête.
Le compoasant permet en plus de désactiver les fonctionnalités d'authentification.

### Fonctionnalités principales
- **Message de redirection** : Affiche un message contextuel pour rediriger les utilisateurs vers d'autres vues ou domaines en fonction de leurs besoins.
- **Bouton de fermeture** : Une icône de fermeture (croix) permet aux utilisateurs de masquer le message de redirection.
- **Liens dynamiques** : Génère des boutons dynamiques pour rediriger les utilisateurs vers des destinations spécifiques, avec des étiquettes et des descriptions personnalisées.
- **Désactivation del'authentification** : Désactive la possibilité de s'authentifier et les messages d'authentification depuis la vue réseau `this.parentCtrl.configurationUtil.discoveryLocalNoLogin = true;`.

### Structure HTML
Le composant utilise une structure HTML basée sur AngularJS avec des directives comme `ng-show` et `ng-repeat` pour afficher dynamiquement les éléments en fonction des données fournies par le contrôleur.

### Fichiers associés
- **HTML** : `prmTopbarAfter/redirectionMessage.html` - Définit la structure du message de redirection et des boutons.
- **CSS** : `custom1.css` - Contient les styles pour le conteneur, les boutons et l'icône de fermeture.
- **JS** : `prmTopbarAfterController.js` - Gère la logique du composant, y compris l'affichage du message et les actions des boutons.

### Exemple d'utilisation
Le composant est injecté dans la vue via le fichier de configuration AngularJS et s'affiche automatiquement après le composant natif `prmTopbar`.

### Personnalisation
- Les textes, les liens et les styles peuvent être modifiés dans les fichiers HTML et CSS.
- Les comportements dynamiques (comme les redirections) sont définis dans le contrôleur AngularJS.

### prmSearchBarAfter(non utilisé)
Autres méthode de développement du même servicve. Abandonnée car non applicable pour les requêtes sur le résolveur de lien et le journal search.
A noter l'usage `this.parentCtrl.jwtUtilService.storageUtil.localStorage` pour le stockage du choix de l'utilisateur dans le navigateur. Non applicable via prmTopbarAfter.