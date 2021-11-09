import { useState, useCallback, MutableRefObject } from 'react'
import { toPng, toJpeg } from 'html-to-image'
import { Options } from 'html-to-image/lib/options'

type ImgType = 'jpg' | 'png'

interface UseScreenshotProps {
  ref?: MutableRefObject<any>
}

export const useScreenshot = (options?: UseScreenshotProps) => {
  const { ref } = options || {}
  const [image, setImage] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const takeScreenshot = useCallback(
    async (type?: ImgType, options?: Options) => {
      setLoading(true)
      let tempImage: string | undefined

      try {
        // Gerando erro de tipagem, pois Element do getElementsByClassName não é o mesmo que HtmlElement do getElementById
        const body = document.getElementsByClassName('ql-editor')[0]!

        if (type === 'jpg') {
          tempImage = await toJpeg(ref?.current || body, options)
        } else {
          tempImage = await toPng(ref?.current || body, options)
        }

        setImage(tempImage)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      } finally {
        setLoading(false)

        return tempImage
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const clear = useCallback(() => setImage(undefined), [])

  return { image, takeScreenshot, isLoading, clear }
}

export default useScreenshot