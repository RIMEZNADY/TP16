import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { TypeTransaction } from '../graphql/types';

const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Historique des Transactions</h3>
        <p className="text-gray-500 text-center py-8">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Historique des Transactions</h3>
        <p className="text-red-600 text-center py-8">Erreur: {error.message}</p>
      </div>
    );

  const transactions = data?.allTransactions || [];

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Historique des Transactions</h3>
        <p className="text-gray-500 text-center py-8">Aucune transaction enregistrée</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Historique des Transactions</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg border-l-4 ${
              transaction.type === TypeTransaction.DEPOT
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      transaction.type === TypeTransaction.DEPOT
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {transaction.type === TypeTransaction.DEPOT ? 'Dépôt' : 'Retrait'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Compte: {transaction.compte?.id || 'N/A'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(transaction.date).toLocaleString('fr-FR')}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === TypeTransaction.DEPOT ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === TypeTransaction.DEPOT ? '+' : '-'}
                  {transaction.montant?.toFixed(2) || '0.00'} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
