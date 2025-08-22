import request from 'supertest'
import { expect, test } from 'vitest'
import { faker } from '@faker-js/faker'

import { app } from '../app'

test('Create a course', async () => {
  await app.ready()

  const response = await request(app.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .send({ title: faker.lorem.words(4) })

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({
    courseId: expect.any(String)
  })
})