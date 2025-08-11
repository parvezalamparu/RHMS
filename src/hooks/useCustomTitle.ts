import {useEffect} from 'react'

export const useCustomTitle = (title: string) => {
  return (
     useEffect(() => {
        document.title = title; 
     }, [title])
  )
}
