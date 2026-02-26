const mongoose = require('mongoose');
const Article = require('../src/models/Article');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_test');
  await Article.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Validaciones', () => {
  test('falla sin title', async () => {
    const article = new Article({ content: 'Contenido válido y largo', author: 'A' });
    await expect(article.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  test('falla si content es muy corto', async () => {
    const article = new Article({ title: 'Título OK', content: 'Corto', author: 'A' });
    await expect(article.save()).rejects.toThrow();
  });

  test('guarda correctamente con datos válidos', async () => {
    const article = new Article({
      title: 'Artículo Válido',
      content: 'Contenido suficientemente largo para pasar la validación.',
      author: 'Test'
    });
    const saved = await article.save();
    expect(saved._id).toBeDefined();
    expect(saved.published).toBe(false);
  });
});

describe('Slug automático', () => {
  test('genera el slug del title', async () => {
    const article = new Article({
      title: 'Node JS Avanzado',
      content: 'Contenido del artículo sobre Node JS avanzado.',
      author: 'A'
    });
    const saved = await article.save();
    expect(saved.slug).toBe('node-js-avanzado');
  });
});

describe('Query statics', () => {
  test('findPublished devuelve solo publicados', async () => {
    await Article.create({
      title: 'Publicado', content: 'Contenido publicado aquí.', author: 'A', published: true
    });
    const results = await Article.findPublished();
    expect(results.every(a => a.published === true)).toBe(true);
  });

  test('findByTag filtra correctamente', async () => {
    await Article.create({
      title: 'Con Tag', content: 'Contenido con tags relevantes.', author: 'A', tags: ['nodejs']
    });
    const results = await Article.findByTag('nodejs');
    expect(results.length).toBeGreaterThan(0);
  });
});

describe('Virtual summary', () => {
  test('devuelve los primeros 150 caracteres', async () => {
    const longContent = 'A'.repeat(200);
    const article = new Article({ title: 'Summary Test', content: longContent, author: 'A' });
    expect(article.summary.length).toBeLessThanOrEqual(150);
  });
});
