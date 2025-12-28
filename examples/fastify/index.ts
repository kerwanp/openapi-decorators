import Fastify from 'fastify'
import { generateDocument } from '../../modules/index.js'
import { generateScalarUI } from '../../modules/ui.js'
import { RecipesController } from '../shared/recipes_controller.js'

const app = Fastify()

const document = await generateDocument({
  controllers: [RecipesController],
  document: {
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
})

app.get('/api', async () => {
  return document
})

app.get('/api/docs', () => {
  const ui = generateScalarUI('/api')
  return ui
})
