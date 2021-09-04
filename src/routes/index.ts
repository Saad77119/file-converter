import { Router } from 'express'
import converter from './converter'

// guaranteed to get dependencies
export default () => {
	const app = Router()
	converter(app)
	return app
}