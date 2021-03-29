import { useEffect, useRef } from 'react'
import { useNotifsContext } from '~/common/hooks'
import Cookies from 'universal-cookie'

interface IProps {
  cookieName: string
}

function getReadableSnakeCase(name: string) {
  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }
  const words = name.match(/[A-Za-z][a-z]*/g) || [];

  return words.map(capitalize).join(" ");
}

export const useUrgentMsgFromCookies = ({ cookieName }: IProps) => {
  const { addNotification } = useNotifsContext()
  const counterRef = useRef<number>(0)
  const cookies = new Cookies()

  useEffect(() => {
    const serviceMsg = cookies.get(cookieName)
    // const value = cookies[cookieName]

    if (!!serviceMsg && !!window) {
      if (!counterRef.current) {
        addNotification({
          title: getReadableSnakeCase(cookieName),
          message: serviceMsg,
          container: 'bottom-left',
          type: 'info',
          onRemoval: (id, removedBy) => {
            console.log(id, removedBy)
            // TODO: Nothing does not works, wtf?
            // deleteCookie(cookieName)
            // cookies.remove(cookieName)
          },
        })
        counterRef.current += 1
      }
    }
  }, [cookies, addNotification, cookieName])

  return null
}
