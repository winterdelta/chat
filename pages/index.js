import styles from '../styles/Home.module.css'
import useSWR, { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import Router from 'next/router'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home () {
  const [errorMessage, setErrorMessage] = useState('')
  const { mutate } = useSWRConfig()
  const { data } = useSWR('/api/fetchComments', fetcher, {
    refreshInterval: 1
  })

  const { handleSubmit, register } = useForm()

  const onSubmit = handleSubmit(async formData => {
    await fetch('/api/createNewComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
  })
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.thread}>
          <div>
            {data?.map((d, index) => {
              return <div key={index}>{d.data?.comment}</div>
            })}
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <input {...register('comment')} />
          <input type='submit'/>
        </form>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  )
}
