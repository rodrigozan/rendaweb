import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.middleware()      
    }

    private middleware() {
        this.server.use(cors())
        this.server.use(express.json())
    }
}