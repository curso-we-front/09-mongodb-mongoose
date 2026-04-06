require('dotenv').config();
const { connect, disconnect } = require('./db/connection');
const Article = require('./models/Article');
const User = require('./models/User');

const run = async () => {
  await connect();
  console.log('Conectado a MongoDB');

  // Ejemplo de uso — puedes modificar esto para probar tu implementación
  const user = await User.create({ name: 'Ana García', email: 'ana@example.com' });

  const article = await Article.create({
    title: 'Introducción a Mongoose',
    content: 'Mongoose es una librería ODM para MongoDB que permite definir schemas con validaciones.',
    author: 'Ana García',
    authorRef: user._id,
    published: true,
    tags: ['mongodb', 'mongoose', 'nodejs'],
  });

  console.log('Artículo creado:', article.title);
  console.log('Slug:', article.slug);
  console.log('Summary:', article.summary);

  const found = await Article.findById(article._id).populate('authorRef');
  console.log('Autor (populate):', found.authorRef);

  await disconnect();
};

run().catch(console.error);
