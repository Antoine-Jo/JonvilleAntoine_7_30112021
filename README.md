# JonvilleAntoine_7_30112021
Backend du P7 OpenClassRooms Node.js/Express/MySQL

# Groupomania

## Tout d'abord : 
* Cloner le repo

## Installation Base de donnée :

1. Créez un schéma dans votre logiciel MySQL avec le nom "groupomania"
2. Sélectionnez cette base de données en faisant : ``` USE groupomania ```
3. Importez les 4 fichiers .sql dans votre base de données qui se trouvent dans le dossier database_config que vous avez cloné

## Installation BackEnd :

Allez dans le dossier backend 
``` 
$ cd backend/ 
```
Puis installer les dépendances
``` 
$ npm i 
```
Créez un fichier .env à la racine du dossier, et copiez ce qui se trouve dans le fichier .env_example.
Ensuite remplissez chaque ligne par vos propres données de connexion à la BDD, et mettez une clef secrète pour le TOKEN

Une fois tout ceci fait, dans le terminal tapez la commande : 
```
$ npx nodemon server
```
