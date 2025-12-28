import express from 'express'
import { RecipesController } from '../shared/recipes_controller.js'
import { generateDocument } from '../../modules/index.js'
import { generateScalarUI } from '../../modules/ui.js'

const app = express()

const document = await generateDocument({
  controllers: [RecipesController],
  document: {
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
})

app.get('/api', async (_, res) => {
  res.send(JSON.stringify(document))
})

app.get('/api/docs', (_, res) => {
  const ui = generateScalarUI('/api')
  res.send(ui)
})
