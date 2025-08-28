import request from 'supertest'
import { expect, test } from 'vitest'

import { app } from '../app'
import { makeUser } from '../tests/factories/make-user'

test('Login', async () => {
  await app.ready()

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(app.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({ email: user.email, password: passwordBeforeHash })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    token: expect.any(String),
  })
})