import z from "zod"
import { eq } from "drizzle-orm"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses/:id', {
    schema: {
      tags: ['courses'],
      summary: 'Get course by ID',
      params: z.object({
        id: z.uuid(),
      }),
      response: {
        200: z.object({
          course: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable()
          })
        }),
        404: z.null().describe('Course not found'),
      }
    }
  }, async (request, reply) => {
    const { id } = request.params

    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id))

    if (result.length > 0) {
      return { course: result[0] }
    }

    return reply.status(404).send()
  })
}