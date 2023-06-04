import { Environment } from 'vitest'

export default <Environment>{
  // let's create an environment to use in isolated tests
  name: 'prisma',
  async setup() {
    // code that will be executed before each file of tests
    console.log('Setup')
    return {
      async teardown() {
        console.log('Teardown')
      }, // code that will be executed after each file of tests
    }
  },
}
