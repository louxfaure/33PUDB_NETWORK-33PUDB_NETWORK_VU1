import redirectionMessageTemplate from './redirectionMessage.html'

class prmTopbarAfterController {
    constructor($scope, $window){
      this.$onInit = function () {
        this.$window = $window;
        console.log('33PUDB : prmTopbarAfterController constructor called');
        console.log(this);
        console.log('Affiche le Message de redirection (showRedirectionMessage)',this.showRedirectionMessage)
        console.log("Choix de l'utilisateur (viewRedirectionMessage):",this.viewRedirectionMessage)
        // Désactive la possibilité de s'authentifier et les messages d'authentification depuis la vue réseau
        this.parentCtrl.configurationUtil.discoveryLocalNoLogin = true;
        this.detectLanguage(); // Détecte la langue au chargement
        this.redirectLinks = [
          { domain: 'pudb-bxsa.primo.exlibrisgroup.com',vid:'BXSA',  name: 'Bordeaux Sciences Agro', ariaLabel:'Vous serez redirigé vers le catalogue Babord+ de Bordeaux Sciences Agro' },
          { domain: 'pudb-iep.primo.exlibrisgroup.com',vid:'IEP',  name: 'Sciences Po Bordeaux', ariaLabel:'Vous serez redirigé vers le catalogue Babord+ de Sciences Po Bordeaux' },
          { domain: 'pudb-inp.primo.exlibrisgroup.com',vid:'INP',  name: 'INP Bordeaux', ariaLabel:'Vous serez redirigé vers le catalogue Babord+ de INP Bordeaux' },
          { domain: 'pudb-ub.primo.exlibrisgroup.com',vid:'UB',  name: 'Université de Bordeaux', ariaLabel:'Vous serez redirigé vers le catalogue Babord+ de Université de Bordeaux' },
          { domain: 'pudb-ubm.primo.exlibrisgroup.com',vid:'UBM',  name: 'Université Bordeaux Montaigne', ariaLabel:'Vous serez redirigé vers le catalogue Babord+ de Université Bordeaux Montaigne' }
        ];
        this.showRedirectionMessage = true;
        }
       

    }

      // Méthode pour détecter la langue et définir le texte
  detectLanguage() {
    const urlParams = new URLSearchParams(this.$window.location.search);
    const lang = urlParams.get('lang') || 'fr'; // Définit 'fr' par défaut si lang est null

    // Définit les textes en fonction de la langue
    switch (lang) {
      case 'en':
        this.titleText = "You're not in the right place?";
        this.contentText = "To improve your search experience, Bordeaux university libraries have updated their search portal. To access your institution's catalog, please click on the link below. You will be redirected to your institution's new portal.";
        this.footerText = "Once redirected, we recommend updating your bookmarks with the new Babord+ catalog URL.";
        break;
      case 'es':
        this.titleText = "¿No estás en el lugar correcto?";
        this.contentText = "Para mejorar su experiencia de búsqueda, las bibliotecas universitarias de Burdeos han actualizado su portal de búsqueda. Para acceder al catálogo de su institución, haga clic en el enlace a continuación. Será redirigido al nuevo portal de su institución.";
        this.footerText = "Una vez redirigido, le recomendamos que actualice sus marcadores con la nueva URL del catálogo Babord+.";
        break;
      default:
        this.titleText = "Vous n'êtes pas au bon endroit ?";
        this.contentText = "Pour améliorer votre expérience de recherche, les bibliothèques universitaires bordelaises ont mis à jour leur portail de recherche. Pour accéder au catalogue de votre institution, veuillez cliquer sur le lien ci-dessous. Vous serez redirigé vers le nouveau portail de votre établissement.";
        this.footerText = "Une fois redirigé, nous vous conseillons de mettre à jour vos favoris avec la nouvelle URL du catalogue Babord+.";
        break;
    }
  }

    // Méthode pour mettre à jour l'URL de redirection dynamiquement
    updateRedirectUrl(domain,vid) {
      const currentUrl = this.$window.location.href; // Récupère l'URL actuelle
      const newUrl = currentUrl.replace(this.$window.location.origin, `https://${domain}`);
      const url = newUrl.replace(/vid=[^&]+/, `vid=33PUDB_${vid}:33PUDB_${vid}_VU1`);
      const defurl = url.replace(/institution=[^&]+/, `institution=33PUDB_${vid}`);
      console.log(`URL mise à jour : ${defurl}`);
      this.$window.location.href = defurl; // Redirige vers la nouvelle URL
    }

    externalSearchMsgOnClick (){
      this.showRedirectionMessage = false;
    };
  }

  prmTopbarAfterController.$inject = ['$scope', '$window']
  export let prmTopbarAfterConfig = {
    bindings: {parentCtrl:'<'},
    controller: prmTopbarAfterController,
    template:  redirectionMessageTemplate,
  }