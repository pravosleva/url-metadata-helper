import React, { useCallback, useState } from 'react'
import { Formik, Form as FormikForm, Field } from 'formik';
import {
  Button,
  Checkbox,
  Container,
  CircularProgress,
  Grid,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import { TValues } from './interfaces'
import { getErrors } from './getErrors'
// import { useRouter } from '~/common/hooks'
import queryString from 'query-string'

const { REACT_APP_API_URL } = process.env

const apiResponseValidator = (axiosRes: any): boolean => !!axiosRes?.data?.id
const apiResponseAccessCodeValidator = (axiosRes: any): boolean => axiosRes?.data?.ok && !!axiosRes?.data?.accessCode

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
  const [targetUiName, setTargetUiName] = useState<string | null>(null)
  const resetTargetUiName = () => {
    setTargetUiName(null)
  }
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const resetErrorMsg = () => {
    setErrorMsg(null);
  };
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const handleCheckAccept = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setIsAccepted(checked);
    },
    [setIsAccepted]
  );
  // const router = useRouter()
  // const { query } = router
  const query: any = queryString.parse(window.location.search)
  const getAccessCode = useCallback(async (): Promise<any> => {
    resetTargetUiName()
    console.log(query)
    if (!query?.hash) {
      return Promise.reject('No hash in query!')
    }
    const res: any = await axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}/auth/get-access-code-by-hash?hash=${query?.hash}`,
    })
    .then((axiosRes) => {
      if (!apiResponseAccessCodeValidator(axiosRes)) {
        throw new Error('Fail');
      }
      return { isOk: true, data: axiosRes.data }
    })
    .catch((err) => {
      return { isOk: false, message: err.message || 'No err.message' }
    });

    if (res.isOk) return Promise.resolve(res.data)

    return Promise.reject(res.message)
  }, [query?.hash, resetTargetUiName])
  const handleSubmit = useCallback(async (data: Partial<TValues>): Promise<TResSuccess | TResFail> => {
    const accessCode = await getAccessCode()
      // @ts-ignore
      .then((data) => {
        if (!!data?.uiName) {
          setTargetUiName(data?.uiName)
        }
        return data.accessCode
      })
      .catch(() => null)
    if (!accessCode) {
      // @ts-ignore
      return Promise.reject('Не удалось получить accessCode')
    }
    const res: any = await axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...data, code: accessCode },
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

    if (res.isOk) return Promise.resolve(res.data)

    return Promise.reject(res.message)
  }, [getAccessCode, setTargetUiName])
  const isCorrect = useCallback(
    (values: TValues): boolean => {
      return Object.keys(getErrors(values)).length === 0 && isAccepted
    },
    [isAccepted]
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
          email: 'admin@sp.ru',
          password: '',
        }}
        validate={getErrors}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          resetErrorMsg();
          setSubmitting(true);
          
          // TODO: GET /get-access-code-by-hash
          // RES: { accessCode: string } -> code -> handleSubmit(values, code)

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
                  defaultValue={values.email}
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Button
                    style={{ marginBottom: '5px' }}
                    // className={classes.standardPrimaryBlueBtn}
                    disabled={isSubmitting || !isCorrect(values)}
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    fullWidth
                    endIcon={
                      isSubmitting && (
                        <CircularProgress
                          size={20}
                        />
                      )
                    }
                  >
                    Submit
                  </Button>
                  <FormControlLabel
                    // className={classes.smallPolicyWrapper}
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleCheckAccept}
                        checked={isAccepted}
                      />
                    }
                    // onChange={(e: any) => { console.log(e); }}
                    label={
                      <span>
                        Я не против записи файлов <b>cookies</b> на моей машине
                      </span>
                    }
                  />
                </div>
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
                      {successMsg}. {!!redirectTo && <a href={redirectTo}>{targetUiName}</a>}
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