interface RouteDefinition<TParams extends object> {
  path: string
  resolvePath: (params?: TParams) => string
}

function createRoute<TParams extends object>(
  path: string,
  resolvePath: RouteDefinition<TParams>['resolvePath'],
): RouteDefinition<TParams> {
  return { path, resolvePath }
}

export const routes = {
  connect: createRoute(
    '/connect',
    () => '/connect',
  ),
  signMessage: createRoute(
    '/sign',
    () => '/sign',
  ),
  transferTokens: createRoute(
    '/transfer',
    () => '/transfer',
  ),
  sendTransaction: createRoute(
    '/send',
    () => '/send',
  ),
  buyCrypto: createRoute(
    '/buy',
    () => '/buy',
  ),
}
