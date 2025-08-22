import request from 'supertest'
import { expect, test } from 'vitest'

import { app } from '../app'
import { makeCourse } from '../tests/factories/make-course'

test('Get a course', async () => {
  await app.ready()

  const course = await makeCourse()

  const response = await request(app.server)
    .get(`/courses/${course.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null
    }
  })
})