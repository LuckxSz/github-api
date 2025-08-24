import express  from 'express'
import cors from 'cors'

type Request = import('express').Request
type Response = import('express').Response

import 'dotenv/config' // se usar .env

const app = express()
app.use(cors()) // libera seu front-end

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const ghHeaders = {
  'User-Agent': 'base-ts-tailwindcss',
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
}

// >>> Rota para dados do usuário
app.get('/api/github/users/:username', async (req: Request, res: Response) => {
  const r = await fetch(`https://api.github.com/users/${req.params.username}`, { headers: ghHeaders })
  const j = await r.json()
  res.status(r.status).json(j)
})

// >>> Rota para repositórios do usuário
app.get('/api/github/users/:username/repos', async (req: Request, res: Response) => {
  const r = await fetch(`https://api.github.com/users/${req.params.username}/repos`, { headers: ghHeaders })
  const j = await r.json()
  res.status(r.status).json(j)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`API proxy on http://localhost:${port}`))
