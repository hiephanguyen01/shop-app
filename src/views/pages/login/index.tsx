import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { NextPage } from 'next'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

import loginLight from '/public/images/login-light.png'
import loginDark from '/public/images/login-dark.png'
import Image from 'next/image'
import Link from 'next/link'

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(EMAIL_REG, 'The field is must email.'),
    password: yup
      .string()
      .required()
      .matches(PASSWORD_REG, 'The password is contain character, number, special character.')
  })
  .required()
type TProps = {}
type TDefaultEmail = { email: string; password: string }
export const LoginPage: NextPage<TProps> = () => {
  const theme = useTheme()
  const defaultValues: TDefaultEmail = { email: '', password: '' }
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  console.log(errors.email)
  function onSubmit(data: { email: string; password: string }) {}
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'left'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? loginLight : loginDark}
          alt='login'
          style={{ width: '50vw', height: '100vh' }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%' }}
          >
            <Box mt={9}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    placeholder='Email..'
                    label='Email Address'
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                )}
                name='email'
              />
            </Box>
            <Box mt={5}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    placeholder='Password'
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    type='password'
                    label='Password'
                  />
                )}
                name='password'
              />
            </Box>
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href='#'
                  style={{
                    color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href='/register'
                  style={{
                    color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}
