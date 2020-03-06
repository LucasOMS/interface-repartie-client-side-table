# Table

Rendez vous dans le code source de l'interface de la table avec ```cd table```

## Dépendances
L'interface de la table nécessite une version de node installé sur le PC.

Installez les dépendances avec la commande ```npm install```
### Sur la table
Sur la table, il est necessaire de lancer le logiciel TUIOTable
### Sur un ordinateur
Sur ordinateur, vous pouvez interagir avec un simulator, pour cela, il faut lancer TUIOClient qui permet d'activer le pont entre le simulateur et l'interface (via des sockets sur le port 9000).
Pour lancer TUIOClient, vous pouvez utiliser le script suivant :
```
git clone https://github.com/AtelierIHMTable/TUIOClient.git TUIOClient
cd TUIOClient
npm install
npm run develop
```

Vous pouvez alors utiliser le simulateur pour interagir, celui-ci a besoin d'une JRE pour fonctionner.

Vous pouvez télécharger TUIO Simulator sur `http://prdownloads.sourceforge.net/reactivision/TUIO_Simulator-1.4.zip?download`.
Vous pouvez ensuite extraire l'archive et lancer TUIOSimulator.jar en double cliquant dessus (si le programme associé aux .jar par défaut est java). 

## Configuration
### Définir la connexion au serveur
Afin que la table se connecte à une adresse distante ou à une adresse locale, rendez vous dnas le fichier ``table/src/utils/constants.js``.

· Pour un déploiement avec un serveur en local, assurez-vous que le `currentProfile` soit égal à `NETWORK_PROFILES.LOCAL` (ligne 94)

· Pour un déploiement avec un serveur distant, changez l'adresse à la ligne 95 par la votre, et changez `currentProfile` pour qu'il soit égal à `NETWORK_PROFILES.PROD` (ligne 94 et 95) 

### Profil de code
Le code permet d'utiliser un profil de développement qui permet d'afficher les interactions tangibles et tactiles sur l'interface, notamment utile lors de l'utilisation du simulateur. Pour l'activer rendez vous dans le fichier ``table/src/index.js`` à la ligne 46 et utilisez PROFILES.LOCAL.

Pour désactiver l'affichage des interactions, utilisez le profil `PROFILES.PROD` à la place.

## Démarrer l'interface
Cloner le code source de l'interface de la table
```
git clone https://github.com/LucasOMS/interface-repartie-client-side-table.git TableEnqueteAuStade
cd TableEnqueteAuStade
```

Afin que l'interaction sur la table foncitonne correctement, i lfaut que l'interface soit en plein écran. Avec google Chrome ou Firefox, vous pouvez activer/désactiver le mode plein écran avec la touche F11.

### Sur la table
Si le serveur est également hébergé sur la table, vous pouvez utiliser `NETWORK_PROFILE.LOCAL`, sinon il faut changer pour `NETWORK_PROFILE.PROD` et définir l'adresse du serveur. _(voir Configuration > Définir la connexion au serveur)_ 

vous pouvez démarrer l'interface sur la table avec le script suivant
```
npm install
npm start
```

L'interface est disponible à l'adresse `http://localhost:3000`

### Sur la table hébergé sur un ordinateur
Afin d'accéder à l'interface hebergé sur un ordinateur depuis la table, il faut forcément utiliser le profil NETWORK_PROFILE.PROD et définir l'adresse du serveur. _(voir Configuration > Définir la connexion au serveur)_

Pour permettre à des connexions distantes d'accéder à l'interface, il faut changer les configs de webpack. Rendez vous dans le fichier `src/webpack.common.js`, remplacez la ligne 42 par `host: 'votreIp'`.

Vous pouvez désormais lancer l'application avec les lignes de commandes suivantes :

```
npm install
npm start
```
L'interface est disponible à l'adresse `http://votreIp:3000`

### Sur un ordinateur
Si le serveur est également hébergé sur l'ordinateur, vous pouvez utiliser `NETWORK_PROFILE.LOCAL`, sinon il faut changer pour `NETWORK_PROFILE.PROD` et définir l'adresse du serveur. _(voir Configuration > Définir la connexion au serveur)_ 

Vous pouvez lancer l'interface avec les lignes de commandes suivantes :

```
npm install
npm start
```
L'interface est disponible à l'adresse `http://localhost:3000`

Vous aurez besoin de TUIOSimulator pour interagir avec l'interface. 

Afin d'avoir la bonne résolution sur l'interface pour que celle-ci soit utilisable, vous pouvez utiliser les outils de développement (F12) puis utiliser Ctrl + maj + M afin d'activer la vue responsive. La table a une résolution de 1920×1080 que vous pouvez définir dans la barre supérieure de l'interface de développement.
