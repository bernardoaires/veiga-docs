import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Controller, FieldName, Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { globalTheme } from '~/utils/theme'
import { StatusTooltip } from './components'

export type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never

type BaseFieldComponentProps<TFormValues> = ControllerRenderProps<FieldValues, FieldName<TFormValues>>

export type HfFieldProps<TFormValues, TComponent extends React.FC<PropsOf<TComponent> & BaseFieldComponentProps<TFormValues>>> = {
  control: Control<TFormValues>
  name: FieldName<TFormValues>
  component: TComponent
  errorMessage?: string
} & Omit<PropsOf<TComponent>, 'name' | 'control' | 'component'>

const useStyles = makeStyles({
  errorTooltip: {
    display: 'flex',
    marginRight: globalTheme.spacing(1.5)
  }
})

export function HfField<TFormValues, TComponent extends React.FC<PropsOf<TComponent>>>(props: React.PropsWithChildren<HfFieldProps<TFormValues, TComponent>>) {
  const { component, control, name, errorMessage, ...rest } = props
  const classes = useStyles()

  const errorAdornment = errorMessage && { 
    endAdornment: (
      <>
        {errorMessage && <StatusTooltip className={classes.errorTooltip} title={errorMessage} />}
      </>
    ) 
  }

  const ComponentToRender = component

  return (
    <Controller
      control={control as any}
      name={name}
      render={({ field }) => (
        <ComponentToRender
          {...field as any}
          {...rest}
          error={Boolean(errorMessage)}
          InputProps={{
            ...errorAdornment
          }}
        />
      )}
    />
  )
}