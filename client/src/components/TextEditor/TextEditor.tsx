import { useCallback, useContext, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io, Socket } from 'socket.io-client'
import { toolbarOptions } from '~/utils'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '~/App'
import { Box, IconButton, Paper, TextField, Typography, useMediaQuery } from '@material-ui/core'
import { Description } from '@material-ui/icons'
import { globalTheme } from '~/utils/theme'
import { LogoutButton } from '..'
import { useScreenshot } from '~/hooks'

interface UrlParams {
  documentId: string
}

export const TextEditor: React.FC = () => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [quill, setQuill] = useState<Quill>()
  const [title, setTitle] = useState<string>('')
  const { documentId } = useParams<UrlParams>()
  const history = useHistory()
  const authAccount = useContext(AuthContext)
  const matches = useMediaQuery('(min-width:600px)')
  const { _id } = authAccount!
  const { takeScreenshot, image } = useScreenshot()
  const editor = document.getElementsByClassName('ql-editor')[0]

  useEffect(() => {
    const socketServer = io('http://localhost:8001')
    setSocket(socketServer)

    return () => {
      socketServer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket || !quill) return

    socket.once('get-title', title => {
      setTitle(title)
    })

    socket.once('load-document', document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit('get-document', documentId, _id)
  }, [socket, quill, documentId, _id])

  useEffect(() => {
    if (!socket || !quill) return

    const interval = setInterval(async () => {
      await takeScreenshot(undefined, { 
        height: editor ? editor.clientWidth : 816,
        style: { margin: 'auto', overflow: 'hidden' }
      })

      socket.emit('save-document', quill.getContents(), title, image || '')
    }, 2000)
    
    return () => {
      clearInterval(interval)
    }
  }, [socket, quill, title, takeScreenshot, image, editor])
  
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

  const handleClick = () => {
    history.push('/app')
  }

  return  (
    <>
      <Box sx={{
        backgroundColor: globalTheme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: globalTheme.palette.common.white,
        width: '100vw',
        position: 'fixed',
        zIndex: 1
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <IconButton onClick={handleClick}><Description sx={{ color: 'white' }} /></IconButton>
          {matches ? (
            <Typography onClick={handleClick} variant='h6' sx={{ cursor: 'pointer' }}>Página inicial</Typography>
          ) : null}
        </Box>
        <Paper>
          <TextField size='small' value={title} onChange={(event) => setTitle(event.target.value)} />
        </Paper>
        <LogoutButton />
      </Box>
      <div className='container' ref={wrapperRef}></div>
    </>
  )
}