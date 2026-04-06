const mongoose = require('mongoose');
const Article = require('../src/models/Article');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_test');
  await Article.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Populate — Tarea 4', () => {
  test('populate trae los datos del usuario referenciado', async () => {
    const user = await User.create({ name: 'Test User', email: 'test@example.com' });

    const article = await Article.create({
      title: 'Artículo con Referencia',
      content: 'Contenido de prueba para el populate del autor.',
      author: 'Test User',
      authorRef: user._id,
    });

    const found = await Article.findById(article._id).populate('authorRef');
    expect(found.authorRef).toBeDefined();
    expect(found.authorRef.name).toBe('Test User');
    expect(found.authorRef.email).toBe('test@example.com');
  });

  test('el virtual summary no se persiste en la base de datos', async () => {
    const longContent = 'B'.repeat(200);
    const article = await Article.create({
      title: 'Persistencia Virtual',
      content: longContent,
      author: 'A',
    });

    const raw = await Article.findById(article._id).lean();
    expect(raw.summary).toBeUndefined();
  });
});
