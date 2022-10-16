import { query as q } from 'faunadb'
import { serverClient } from '../../utils/fauna-auth'

export default async function createNewComment (req, res) {
  const { comment } = req.body

  try {
    await serverClient.query(
      q.Create(q.Collection('comments'), {
        data: {
          comment
        }
      })
    )
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
