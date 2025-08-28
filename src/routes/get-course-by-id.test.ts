import request from 'supertest'
import { expect, test } from 'vitest'

import { app } from '../app'
import { makeCourse } from '../tests/factories/make-course'
import { makeAuthenticatedUser } from '../tests/factories/make-user'

test('Get a course', async () => {
  await app.ready()

  const { token } = await makeAuthenticatedUser('student')
  const course = await makeCourse()

  const response = await request(app.server)
  .get(`/courses/${course.id}`)
  .set('Authorization', token)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null
    }
  })
})

test('Return 404 for non existing course.', async () => {
  await app.ready()

  const { token } = await makeAuthenticatedUser('student')

  const response = await request(app.server)
  .get(`/courses/b36b17a3-7167-4c8b-8b31-e1d6ae558e79`)
  .set('Authorization', token)

  expect(response.status).toEqual(404)
})