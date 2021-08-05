import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io, Socket } from 'socket.io-client'
import { toolbarOptions } from '~/utils'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { useParams } from 'react-router-dom'

interface UrlParams {
  documentId: string
}

export const TextEditor: React.FC = () => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [quill, setQuill] = useState<Quill>()
  const { documentId } = useParams<UrlParams>()

  useEffect(() => {
    const socketServer = io('http://localhost:3001')
    setSocket(socketServer)

    return () => {
      socketServer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket || !quill) return

    socket.once('load-document', document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit('get-document', documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (!socket || !quill) return

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents())
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (!socket || !quill) return

    const handler = (delta: any) => {
      quill.updateContents(delta)
    }
    socket.on('receive-changes', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (!socket || !quill) return

    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return
      socket.emit('send-changes', delta)
    }
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper: Element | null) => {
    if (!wrapper) return

    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    const quillInstance = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    })
    quillInstance.disable()
    quillInstance.setText('Loading...')
    setQuill(quillInstance)
  }, [])

  return  (
    <div className='container' ref={wrapperRef}></div>
  )
}