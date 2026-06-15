import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes'
import activityRoutes from './src/routes/activityRoutes'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/activities', activityRoutes)

app.listen(port,()=>{console.log('servidor funcionando')});
