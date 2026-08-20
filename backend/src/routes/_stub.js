import { Router } from 'express'
import { fail } from '../utils/apiResponse.js'

/**
 * Generic "not built yet" stub so the route exists (and the frontend gets
 * a clear, structured response) before its real controller/service lands
 * in a later phase. Replace with real handlers as each phase is built.
 */
function notImplemented(featureName) {
  return (req, res) =>
    fail(res, 501, `${featureName} API is scaffolded but not implemented yet (see project roadmap).`)
}

export function stubRouter(featureName, routes = ['/']) {
  const router = Router()
  for (const path of routes) {
    router.all(path, notImplemented(featureName))
  }
  return router
}
