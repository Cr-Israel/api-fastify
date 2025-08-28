import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { checkUserRole } from "./hooks/check-user-role.ts"
import { checkRequestJWT } from "./hooks/check-request-jwt.ts"

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    preHandler: [
      checkRequestJWT,
      checkUserRole('manager')
    ],
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      description: 'This route receive a title and create a course in database',
      body: z.object({
        title: z.string().min(5, 'Título precisa ter pelo menos 5 caracteres.'),
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Course created successfully!')
      }
    },
  }, async (request, reply) => {
    const { title } = request.body

    const result = await db
      .insert(courses)
      .values({ title: title })
      .returning()

    return reply.status(201).send({ courseId: result[0].id })
  })
}