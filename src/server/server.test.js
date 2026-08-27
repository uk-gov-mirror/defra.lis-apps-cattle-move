import { afterEach, expect, test, vi } from 'vitest'

import { logger } from '@defra/lis-hubs-infra-core'

afterEach(() => {
  delete process.env.LOG_FORMAT
})

test('server.js maps LOG_FORMAT=pino-pretty onto the logger pretty-print format', async () => {
  // Arrange
  process.env.LOG_FORMAT = 'pino-pretty'
  vi.resetModules()

  // Act
  await import('./server.js')

  // Assert
  expect(logger.format).toBe('pretty-print')
})

test('server.js passes any other LOG_FORMAT value through to the logger unchanged', async () => {
  // Arrange
  process.env.LOG_FORMAT = 'ecs'
  vi.resetModules()

  // Act
  await import('./server.js')

  // Assert
  expect(logger.format).toBe('ecs')
})
