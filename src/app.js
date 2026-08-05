require("dotenv").config()
const { connect, disconnect } = require("./db/connection")
const Article = require("./models/Article")
const User = require("./models/User")

const run = async () => {
  await connect()
  console.log("Conectado a MongoDB")

  const user = await User.create({ name: "Jaime", email: "jaimeveloso@example.com" })

  const article = await Article.create({
    title: "Ser programador",
    content:
      "Hoy vamos a ver el recorrido desde que empezamos con una simple funcion hasta trabajar en Google",
    author: "Jaime Veloso",
    authorRef: user._id,
    published: true,
    tags: ["developer", "programming", "google"],
  })

  console.log("Artículo creado:", article.title)
  console.log("Slug:", article.slug)
  console.log("Summary:", article.summary)

  const found = await Article.findById(article._id).populate("authorRef")
  console.log("Autor (populate):", found.authorRef)

  await disconnect()
}

run().catch(console.error)
