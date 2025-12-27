import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_TRANSACTIONS, GET_ALL_COMPTES } from '../graphql/queries';
import { TypeTransaction } from '../graphql/types';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    compteId: '',
    type: TypeTransaction.DEPOT,
    montant: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: GET_ALL_TRANSACTIONS },
      { query: GET_ALL_COMPTES },
    ],
    onCompleted: () => {
      setFormData({
        compteId: '',
        type: TypeTransaction.DEPOT,
        montant: '',
      });
      setSuccessMessage('Transaction ajoutée avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    await addTransaction({
      variables: {
        transactionRequest: {
          type: formData.type,
          montant: parseFloat(formData.montant),
          compteId: formData.compteId,
        },
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter une Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="compteId" className="block text-sm font-medium text-gray-700 mb-1">
            ID du Compte
          </label>
          <input
            type="text"
            id="compteId"
            name="compteId"
            value={formData.compteId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Entrez l'ID du compte"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type de transaction
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value={TypeTransaction.DEPOT}>Dépôt</option>
            <option value={TypeTransaction.RETRAIT}>Retrait</option>
          </select>
        </div>

        <div>
          <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
            Montant (€)
          </label>
          <input
            type="number"
            id="montant"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="0.00"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            Erreur: {error.message}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${
            formData.type === TypeTransaction.DEPOT
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading
            ? 'Traitement...'
            : formData.type === TypeTransaction.DEPOT
            ? 'Effectuer le dépôt'
            : 'Effectuer le retrait'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
