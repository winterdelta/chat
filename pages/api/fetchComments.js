// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { query as q } from 'faunadb'
import { serverClient } from '../../utils/fauna-auth'

const fetchComments = async (req, res) => {
  try {
    const comments = await serverClient.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('all_comments') // specify source
          )
        ),
        ref => q.Get(ref) // lookup each result by its reference
      )
    )
    // ok
    console.log(JSON.stringify(comments))
    res.status(200).json(comments.data)
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message })
  }
}

export default fetchComments
