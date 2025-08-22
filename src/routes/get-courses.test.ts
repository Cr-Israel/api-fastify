import { randomUUID } from 'node:crypto'

import request from 'supertest'
import { expect, test } from 'vitest'

import { app } from '../app'
import { makeCourse } from '../tests/factories/make-course'

test('Get courses', async () => {
  await app.ready()

  const titleId = randomUUID()

  const course = await makeCourse(titleId)

  const response = await request(app.server)
    .get(`/courses?search=${titleId}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [{
      id: expect.any(String),
      title: titleId,
      enrollments: 0
    }]
  })
})

test('Return 404 for non existing courses', async () => {
  await app.ready()

  const response = await request(app.server)
    .get(`/courses/2819a0bd-ec8a-4ef6-88b9-c07a7802dd07`)

  expect(response.status).toEqual(404)
})