import express from 'express'
import mongoose from 'mongoose'
import router from './src/rotas/router'
import { setupMiddlewares } from './src/middleware/middlewares'

class App {
    public express: express.Application

    public constructor() {
        this.express = express()
        setupMiddlewares(this.express);
        this.database()
        this.routes()
    }

    

    public async database() {
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect('mongodb://localhost:27017/to-do-list')
            console.log("Connect database sucess")
        } catch (error) {
            console.error('Cannot connect to database, error:', error)
        }
    }

    public routes(): void {
        this.express.use('/api', router)
    }
}

export default new App().express