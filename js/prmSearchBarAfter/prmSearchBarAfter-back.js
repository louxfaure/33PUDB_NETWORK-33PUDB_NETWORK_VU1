import customToastTemplate from './customToast.html';

class PrmSearchBarAfterController {
  constructor($scope, $element, $translate, $window ){
    console.log("PrmSearchAfterController constructor called");

    this.$onInit = function () {
      console.log("Contenu de parentCtrl :", this.parentCtrl);

      this.$scope = $scope;
      this.$element = $element;
      this.$translate = $translate;
      this.$window = $window;

      // Désactive la possibilité de s'authentifier et les messages d'authentification depuis la vue réseau
      this.parentCtrl.configurationUtil.discoveryLocalNoLogin = true; 

      // Vérifiez si le message doit être affiché
      if (!this.isMessageDismissed()) {
        const redirectLinks = this.generateRedirectLinks();
        this.insertAlertBar(redirectLinks);
      }
    };
  }

  // Vérifie si le message a été masqué
  isMessageDismissed() {
    const value = sessionStorage.getItem('hideAttentionMessage');
    console.log("isMessageDismissed value:", value);
    return value === 'true';
  }

  // Génère les liens de redirection
  generateRedirectLinks() {
    const currentUrl = this.$window.location.href; // Récupère l'URL actuelle
    const baseDomains = [
      { domain: 'pudb-ub.primo.exlibrisgroup.com', vid: '33PUDB_UB:33PUDB_UB_VU1' ,nom:'Université de bordeaux'},
      { domain: 'pudb-ubm.primo.exlibrisgroup.com', vid: '33PUDB_UBM:33PUDB_UBM_VU1',nom:'Université Bordeaux Montaigne' },
      { domain: 'pudb-iep.primo.exlibrisgroup.com', vid: '33PUDB_IEP:33PUDB_IEP_VU1' ,nom:'Sciences Po Bordeaux'},
      { domain: 'pudb-bxsa.primo.exlibrisgroup.com', vid: '33PUDB_BXSA:33PUDB_BXSA_VU1',nom:'Bordeaux Sciences Agro' },
      { domain: 'pudb-inp.primo.exlibrisgroup.com', vid: '33PUB_INP:33PUB_INP_VU1',nom:'INP Bordeaux' }
    ];

    return baseDomains.map(({ domain, vid,nom }) => {
      // Remplace le domaine
      const newUrl = currentUrl.replace(this.$window.location.origin, `https://${domain}`);
      // Remplace le paramètre vid
      return {
        url:newUrl.replace(/vid=[^&]+/, `vid=${vid}`),
        logo: vid.replace(/^.*?:/,''),
        name: nom
      };
    });
  }

  // Insère la barre d'alerte dans le DOM
  insertAlertBar(redirectLinks) {
    const alertBarContainer = this.$element[0]; // Récupère l'élément DOM du composant
    const alertBar = document.createElement('div'); // Crée un conteneur pour la barre d'alerte
    alertBar.classList.add('layout-align-center-center','bar', 'alert-bar', 'layout-column'); // Ajoute une classe pour le style

    // Ajoute les liens dans la barre d'alerte
    alertBar.innerHTML = `
    <div class="message-redirection">
    <p>Attention, vous êtes sur un site temporaire. Voici les liens vers les sites principaux :</p>
    </div>
      <div layout="row" layout-align="space-around center" class="layout-row">
        ${redirectLinks.map(link => `
          <md-button class="md-raised md-primary md-button md-primoExplore-theme" href="${link.url}" aria-label="Lien vers ${link.name}">
            ${link.name}
          </md-button>
        `).join('')}
      </div>
      <div class="layout-align-center-center layout-row">
 <button class="custom-toast-close zero-margin md-button md-primoExplore-theme md-ink-ripple button-with-icon" type="button" ng-transclude="" aria-label="nui.message.dismiss" (click)="$ctrl.onClose()" ng-class="$ctrl.mediaQueries.xs ? 'md-icon-button' : 'button-with-icon' "><prm-icon icon-type="svg"
      svg-icon-set="navigation" icon-definition="ic_close_24px"><!----><md-icon
        ng-if="($ctrl.iconDefinition &amp;&amp; !$ctrl.isCustom &amp;&amp; !$ctrl.isEmailMode()) &amp;&amp; !$ctrl.useFallBack"
        md-svg-icon="navigation:ic_close_24px" role="presentation" class="md-primoExplore-theme"><svg width="100%"
          height="100%" viewBox="0 0 24 24" id="ic_close_24px_cache42" y="240" xmlns="http://www.w3.org/2000/svg" fit=""
          preserveAspectRatio="xMidYMid meet" focusable="false">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
          </path>
        </svg></md-icon>
        <span translate="nui.message.dismiss" hide-xs="" class="hide-xs">FERMER</span>
        </div>
    `;

// Ajoute la barre d'alerte au DOM
alertBarContainer.appendChild(alertBar);

    // Ajoute un gestionnaire pour fermer la barre d'alerte
    const closeButton = alertBar.querySelector('.custom-toast-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        alertBar.style.display = 'none';
        sessionStorage.setItem('hideAttentionMessage', 'true');
      });
    }
  }
}

PrmSearchBarAfterController.$inject = ['$scope', '$element', '$translate', '$window'];

export let prmSearchBarAfterConfig = {
  bindings: { parentCtrl: '<' },
  controller: PrmSearchBarAfterController,
};