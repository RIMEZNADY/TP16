import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
    onCompleted: () => {
      setSolde('');
      setType('COURANT');
      setSuccessMessage('Compte créé avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    await saveCompte({
      variables: {
        compte: {
          solde: parseFloat(solde),
          type,
        },
      },
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Créer un Compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="solde" className="block text-sm font-medium text-gray-700 mb-1">
            Solde initial (€)
          </label>
          <input
            type="number"
            id="solde"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="Entrez le solde initial"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type de compte
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
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
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Création en cours...' : 'Créer un compte'}
        </button>
      </form>
    </div>
  );
};

export default CreateCompte;
