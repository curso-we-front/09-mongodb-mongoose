# 09 — Mongoose: Schemas, Modelos y Validaciones

## Objetivo

Usar Mongoose para definir schemas con tipos y validaciones declarativas, y entender las ventajas frente al driver nativo.

## Contexto

Reescribimos la capa de datos usando Mongoose en lugar del driver nativo. El modelo del blog crece: los artículos tienen tags y un campo de metadatos.

## Tareas

### Tarea 1 — Schema de Article (`src/models/Article.js`)
Define el schema con Mongoose incluyendo:
- `title`: String, requerido, entre 3 y 100 caracteres
- `content`: String, requerido, mínimo 10 caracteres
- `author`: String, requerido
- `slug`: String, único — se genera automáticamente del `title` antes de guardar (hook `pre('save')`)
- `published`: Boolean, default `false`
- `tags`: Array de Strings
- `createdAt` / `updatedAt`: automáticos con `timestamps: true`

### Tarea 2 — Métodos estáticos del modelo
Añade al schema:
- `Article.findPublished()` → query estática que devuelve los publicados
- `Article.findByTag(tag)` → filtra por tag

### Tarea 3 — Virtuals
Añade un campo virtual `summary` que devuelva los primeros 150 caracteres del `content`.

### Tarea 4 — Población y refs
Añade un campo `authorRef` que sea una referencia al modelo `User` (crea `src/models/User.js` con `name`, `email`).  
Implementa una query que use `.populate('authorRef')` para obtener los datos del autor.

## Estructura esperada

```
09-mongodb-mongoose/
├── src/
│   ├── db/
│   │   └── connection.js
│   ├── models/
│   │   ├── Article.js   ← Tareas 1, 2, 3
│   │   └── User.js      ← Tarea 4
│   └── app.js
├── tests/
│   ├── article.model.test.js
│   └── virtuals.test.js
├── .env.example
└── package.json
```

## Cómo empezar

```bash
cp .env.example .env
npm install
npm test
```

## Criterios de evaluación

- [ ] El hook `pre('save')` genera el slug automáticamente
- [ ] Mongoose lanza `ValidationError` si faltan campos requeridos
- [ ] El virtual `summary` no se persiste en BD
- [ ] `.populate('authorRef')` trae los datos del usuario
- [ ] Los tests pasan
