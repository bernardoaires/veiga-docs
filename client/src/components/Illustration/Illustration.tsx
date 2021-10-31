import React from 'react'
import * as rawIllustrations from '../../assets/svg'
import { IllustrationProps as IllustrationPropsType } from '../../assets/svg/types'

type IllustrationName = keyof typeof rawIllustrations

export interface IllustrationProps extends IllustrationPropsType {
  name: IllustrationName
}

export const Illustration: React.FC<IllustrationProps> = (props) => {
  const {  name, ...rest } = props

  const IllustrationComponent = rawIllustrations[name]

  return (
    <IllustrationComponent {...rest} />
  )
}