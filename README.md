# TP16
# Application de Gestion Bancaire - Documentation


Cette application web permet de gérer des comptes bancaires et leurs transactions financières. Elle utilise React pour l'interface utilisateur et Apollo Client pour communiquer avec une API GraphQL.

## Fonctionnalités principales

- **Création de comptes** : Créer de nouveaux comptes bancaires (Courant ou Épargne) avec un solde initial
- **Liste des comptes** : Visualiser tous les comptes existants avec leurs informations (ID, solde, type, date de création)
- **Ajout de transactions** : Effectuer des dépôts ou des retraits sur un compte
- **Historique des transactions** : Consulter toutes les transactions effectuées

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer l'URL de l'API GraphQL dans `src/apollo/client.js` (par défaut : `/graphql`)

3. Démarrer l'application :
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Structure du projet

```
src/
├── apollo/
│   └── client.js          # Configuration Apollo Client
├── components/
│   ├── CompteList.js      # Affichage de la liste des comptes
│   ├── CreateCompte.js    # Formulaire de création de compte
│   ├── TransactionForm.js # Formulaire d'ajout de transaction
│   └── TransactionList.js # Affichage de l'historique des transactions
├── graphql/
│   ├── mutations.js       # Mutations GraphQL
│   ├── queries.js         # Requêtes GraphQL
│   ├── types.js           # Types et énumérations
│   └── interfaces.js      # Interfaces TypeScript
├── App.js                 # Composant principal
└── index.js              # Point d'entrée
```

## Technologies utilisées

- **React 18** : Bibliothèque JavaScript pour l'interface utilisateur
- **Apollo Client 3** : Client GraphQL pour React
- **Tailwind CSS 3** : Framework CSS pour le style
- **GraphQL** : Langage de requête pour les APIs

## Utilisation

### Créer un compte

1. Remplir le formulaire "Créer un Compte"
2. Entrer le solde initial
3. Sélectionner le type de compte (Courant ou Épargne)
4. Cliquer sur "Créer un compte"

### Ajouter une transaction

1. Remplir le formulaire "Ajouter une Transaction"
2. Entrer l'ID du compte concerné
3. Sélectionner le type (Dépôt ou Retrait)
4. Entrer le montant
5. Cliquer sur le bouton de validation

### Consulter les données

- La liste des comptes s'affiche automatiquement et se met à jour après chaque création
- L'historique des transactions affiche toutes les transactions enregistrées

## Notes importantes

- Assurez-vous que votre serveur GraphQL est démarré et accessible avant d'utiliser l'application
- Les types de comptes supportés sont : COURANT et EPARGNE
- Les types de transactions supportés sont : DEPOT et RETRAIT

scrrens:
<img width="2558" height="1467" alt="image" src="https://github.com/user-attachments/assets/cd26060c-8684-460a-b7e2-9d22722a7369" />
<img width="2559" height="1460" alt="image" src="https://github.com/user-attachments/assets/ce0ea22d-d333-43d7-afc3-78bad4dfad52" />


