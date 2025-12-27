const { ApolloServer, gql } = require('apollo-server');

// Données en mémoire (sans persistence)
let comptes = [];
let transactions = [];
let compteIdCounter = 1;
let transactionIdCounter = 1;

// Schéma aligné avec le frontend
const typeDefs = gql`
  enum TypeCompte {
    COURANT
    EPARGNE
  }

  enum TypeTransaction {
    DEPOT
    RETRAIT
  }

  type Compte {
    id: ID!
    solde: Float!
    type: TypeCompte!
    dateCreation: String!
  }

  type CompteAggregate {
    count: Int!
    sum: Float!
    average: Float!
  }

  type Transaction {
    id: ID!
    type: TypeTransaction!
    montant: Float!
    date: String!
    compte: Compte!
  }

  type TransactionStats {
    count: Int!
    sumDepots: Float!
    sumRetraits: Float!
  }

  input CompteRequest {
    solde: Float!
    type: TypeCompte!
  }

  input TransactionRequest {
    type: TypeTransaction!
    montant: Float!
    compteId: ID!
  }

  type Query {
    allComptes: [Compte!]!
    compteById(id: ID!): Compte
    findCompteByType(type: TypeCompte!): [Compte!]!
    totalSolde: CompteAggregate!

    allTransactions: [Transaction!]!
    compteTransactions(id: ID!): [Transaction!]!
    transactionStats: TransactionStats!
  }

  type Mutation {
    saveCompte(compte: CompteRequest!): Compte!
    deleteCompte(id: ID!): Boolean!
    addTransaction(transactionRequest: TransactionRequest!): Transaction!
  }
`;

const resolvers = {
  Query: {
    allComptes: () => comptes,
    compteById: (_, { id }) => comptes.find(c => c.id === id) || null,
    findCompteByType: (_, { type }) => comptes.filter(c => c.type === type),
    totalSolde: () => {
      const count = comptes.length;
      const sum = comptes.reduce((acc, c) => acc + (c.solde || 0), 0);
      const average = count === 0 ? 0 : sum / count;
      return { count, sum, average };
    },

    allTransactions: () => transactions,
    compteTransactions: (_, { id }) => transactions.filter(t => t.compteId === id),
    transactionStats: () => {
      const count = transactions.length;
      const sumDepots = transactions
        .filter(t => t.type === 'DEPOT')
        .reduce((acc, t) => acc + t.montant, 0);
      const sumRetraits = transactions
        .filter(t => t.type === 'RETRAIT')
        .reduce((acc, t) => acc + t.montant, 0);
      return { count, sumDepots, sumRetraits };
    },
  },
  Mutation: {
    saveCompte: (_, { compte }) => {
      const newCompte = {
        id: String(compteIdCounter++),
        solde: compte.solde,
        type: compte.type,
        dateCreation: new Date().toISOString(),
      };
      comptes.push(newCompte);
      return newCompte;
    },
    deleteCompte: (_, { id }) => {
      const before = comptes.length;
      comptes = comptes.filter(c => c.id !== id);
      // supprimer aussi les transactions liées
      transactions = transactions.filter(t => t.compteId !== id);
      return comptes.length < before;
    },
    addTransaction: (_, { transactionRequest }) => {
      const { compteId, montant, type } = transactionRequest;
      const compte = comptes.find(c => c.id === compteId);
      if (!compte) {
        throw new Error(`Compte avec l'ID ${compteId} non trouvé`);
      }

      if (type === 'DEPOT') {
        compte.solde += montant;
      } else if (type === 'RETRAIT') {
        if (compte.solde < montant) {
          throw new Error('Solde insuffisant');
        }
        compte.solde -= montant;
      }

      const transaction = {
        id: String(transactionIdCounter++),
        compteId,
        montant,
        type,
        date: new Date().toISOString(),
      };
      transactions.push(transaction);
      return transaction;
    },
  },
  Transaction: {
    compte: (transaction) => comptes.find(c => c.id === transaction.compteId),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: 4000, host: '0.0.0.0' })
  .then(({ url }) => {
    console.log(`🚀 Serveur GraphQL prêt sur ${url}`);
  })
  .catch((err) => {
    console.error('Erreur Apollo Server:', err);
    process.exit(1);
  });
