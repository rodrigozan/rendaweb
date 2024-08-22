import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'

import router from "./router"

dotenv.config()

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.middleware()
        this.routes()      
    }

    private middleware() {
        this.server.use(cors())
        this.server.use(express.json())
    }

    private routes() {
        this.server.use('/api', router)
    }
}