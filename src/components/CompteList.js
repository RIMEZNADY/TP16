import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Comptes</h2>
        <p className="text-center py-8 text-gray-500">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Comptes</h2>
        <p className="text-center py-8 text-red-600">Erreur: {error.message}</p>
      </div>
    );

  const comptes = data?.allComptes || [];

  if (comptes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Comptes</h2>
        <p className="text-center py-8 text-gray-500">Aucun compte trouvé. Créez votre premier compte !</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des Comptes</h2>
      <div className="space-y-4">
        {comptes.map((compte) => (
          <div key={compte.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500">ID: <span className="font-mono text-gray-700">{compte.id}</span></p>
                <p className="text-2xl font-bold text-primary-600 mt-1">{compte.solde?.toFixed(2) || '0.00'}€</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                compte.type === 'COURANT' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {compte.type}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Date de création: {new Date(compte.dateCreation).toLocaleDateString('fr-FR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;
