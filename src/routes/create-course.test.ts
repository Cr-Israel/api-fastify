import request from 'supertest'
import { expect, test } from 'vitest'
import { faker } from '@faker-js/faker'

import { app } from '../app'
import { makeAuthenticatedUser } from '../tests/factories/make-user'

test('Create a course', async () => {
  await app.ready()

  const { token } = await makeAuthenticatedUser('manager')

  const response = await request(app.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({ title: faker.lorem.words(4) })

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({
    courseId: expect.any(String)
  })
})