import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient() // create connection with database

prisma.user.create({
  data: {
    name: 'Mateus Raimundo',
    email: 'mateus@email.com',
  },
})
