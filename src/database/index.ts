import mongoose from 'mongoose';
import conf from '../environment';

// Une assertion de type ne vérifie rien : si la variable n'est pas définie,
// conf[undefined] vaut undefined et le serveur s'arrête sur une erreur obscure.
const nomEnv =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = conf[nomEnv];

// Surtout pas de console.log(env) ici : l'objet contient l'URL de connexion,
// donc l'identifiant et le mot de passe, qui finiraient dans les journaux du
// serveur, lus par bien plus de monde que le code.

export const clientPromise = mongoose
  .connect(env.dbUrl)
  .then((m) => m.connection.getClient())
  .catch((err) => console.log(err));
