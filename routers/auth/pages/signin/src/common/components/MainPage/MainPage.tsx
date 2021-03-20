import React, { useCallback, useState } from 'react'
import { Container } from '@material-ui/core'
import { Formik, Form as FormikForm, Field } from 'formik';
import {
  Button,
  // Checkbox,
  CircularProgress,
  Grid,
  // FormControlLabel,
  TextField,
} from '@material-ui/core';
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import { TValues } from './interfaces'
import { getErrors } from './getErrors'

const apiResponseValidator = (axiosRes: any): boolean => !!axiosRes?.data?.id

type TResSuccess = {
  isOk: boolean
  data: any
  message: string
  redirect: string
}
type TResFail = {
  isOk: boolean
  message: string
}

export const MainPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [redirectTo, setRedirectTo] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const resetErrorMsg = () => {
    setErrorMsg(null);
  };
  const handleSubmit = useCallback(async (data: Partial<TValues>): Promise<TResSuccess | TResFail> => {
    const res = await axios({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO: req
      data: { ...data, code: 'sp.otapi.v1.svyaznoy.jwt' },
    })
    .then((axiosRes) => {
      if (!apiResponseValidator(axiosRes)) {
        throw new Error('Data is incorrect');
      }
      return { isOk: true, data: axiosRes.data }
    })
    .catch((err) => {
      return { isOk: false, message: err.message || 'No err.message' }
    });

    // @ts-ignore
    if (res.isOk) return Promise.resolve(res.data)
    // @ts-ignore
    return Promise.reject(res.message)
  }, [])
  const isCorrect = useCallback(
    (values: TValues): boolean => {
      return Object.keys(getErrors(values)).length === 0
    },
    []
  );

  return (
    <Container
      style={{
        marginTop: '20px',
      }}
      maxWidth="md"
      // className={clsx(classes.minimalHeightSetting, {
      //   [baseClasses.noPaddingMobile]: isTheNotePage,
      // })}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={getErrors}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          resetErrorMsg();
          setSubmitting(true);
          handleSubmit(values)
            .then((data) => {
              // addSuccessNotif({ message: 'Ваша заявка отправлена' });
              setSubmitting(false);
              setSuccessMsg(data.message)
              // @ts-ignore
              if (!!data.redirect) setRedirectTo(data.redirect)
              resetForm()
            })
            .catch((err) => {
              // addDangerNotif({ message: err?.message || 'Извините, что-то пошло не так' });
              setSubmitting(false)
              setErrorMsg(err)
            });
        }}
      >
        {({ submitForm, isSubmitting, errors, setFieldValue, values }) => (
          <FormikForm>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field
                  // autoFocus
                  // className={classes.standardFilledTextField}
                  component={TextField}
                  name="email"
                  type="text"
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  size="small"
                  variant="filled"
                  onChange={(e: any) => {
                    setFieldValue('email', e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  // autoFocus
                  // className={classes.standardFilledTextField}
                  component={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  size="small"
                  variant="filled"
                  onChange={(e: any) => {
                    setFieldValue('password', e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button
                // className={classes.standardPrimaryBlueBtn}
                disabled={isSubmitting || !isCorrect(values)}
                variant="contained"
                color="primary"
                onClick={submitForm}
                // fullWidth={isMobile}
                endIcon={
                  isSubmitting && (
                    <CircularProgress
                      size={20}
                    />
                  )
                }
              >
                Отправить заявку
              </Button>

              </Grid>
              {!!errorMsg &&
                (
                  <Grid item xs={12}>
                      <Alert
                        severity="error"
                        variant="outlined"
                        // action={
                        //   <IconButton
                        //     aria-label="close"
                        //     color="inherit"
                        //     size="small"
                        //     onClick={() => {
                        //       setIsIMEIAlertOpen(false);
                        //     }}
                        //   >
                        //     <CloseIcon fontSize="inherit" />
                        //   </IconButton>
                        // }
                      >
                        {errorMsg}
                      </Alert>
                    </Grid>
                )
              }
              {!!successMsg &&
                (
                  <Grid item xs={12}>
                    <Alert
                      severity="success"
                      variant="outlined"
                      // action={
                      //   <IconButton
                      //     aria-label="close"
                      //     color="inherit"
                      //     size="small"
                      //     onClick={() => {
                      //       setIsIMEIAlertOpen(false);
                      //     }}
                      //   >
                      //     <CloseIcon fontSize="inherit" />
                      //   </IconButton>
                      // }
                    >
                      {successMsg}{!!redirectTo && <>{' '}<a href={redirectTo}>Перейти</a></>}
                    </Alert>
                  </Grid>
                )
              }
            </Grid>
          </FormikForm>
        )}
      </Formik>
    </Container>
  )
}