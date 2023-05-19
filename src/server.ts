import { app } from "./app"
import { env } from "./env"

app.listen({
  host: '0.0.0.0', // this code is for our application to be accessible to the frontend
  port: env.PORT,
}).then(() => {console.log(`🚀HTTP Server running in port ${env.PORT}!`)}) // command for show emojis: 'windows + .'