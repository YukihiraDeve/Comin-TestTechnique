#🚀 Déploiement de l'application React Native avec Expo sur iOS

##Prérequis:
Node.js: Assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez le télécharger depuis ici.

###Expo CLI:
Installez Expo CLI globalement en utilisant npm :

npm install -g expo-cli

##Étapes de déploiement:
###Cloner le dépôt:

git clone [URL_DU_DÉPÔT]
cd [NOM_DU_DÉPÔT]

###Installation des dépendances:

npm install

###Exécution sur le simulateur iOS:
npx expo run:ios

Cela lancera automatiquement l'application sur le simulateur iOS.

###Exécution sur un vrai dispositif:

Installez l'application Expo Go depuis l'App Store sur votre iPhone.
Assurez-vous que votre ordinateur et votre iPhone sont sur le même réseau Wi-Fi.
Exécutez la commande suivante dans le terminal :
expo start

Scanner le QRCode sur l'app Photo.

##Problèmes courants et solutions:
Problèmes de connexion:
Assurez-vous que votre ordinateur et votre dispositif sont sur le même réseau Wi-Fi. Si vous avez toujours des problèmes, essayez de désactiver temporairement votre pare-feu.

##Dépendances manquantes:
Si vous obtenez des erreurs concernant des dépendances manquantes, assurez-vous d'avoir bien exécuté npm install.