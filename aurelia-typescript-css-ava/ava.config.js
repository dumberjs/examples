export default {
  typescript: {
    extensions: ['ts', 'tsx'],
    rewritePaths: {'src/': 'build/'}
  },
  files: ['test/**/*.spec.ts'],
  'require': ['ts-node/register', './test/setup.ts']
}
