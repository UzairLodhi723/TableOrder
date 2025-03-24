import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LeftBox from "./LeftBox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import InputField from "../../component/TextFields/TextFields";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/rtk";
import { resAPI } from "../../utils/hooks/apiResponse";
import { toast } from "react-toastify";
import { addtoken } from "../../store/store";
import { useDispatch } from "react-redux";

interface FormValues {
  email: string;
  password: string;
  submit: null;
}

const Login: React.FC = () => {
    const [createLogin,{isLoading,isError}] = useLoginMutation()
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
     const payload  = {
          email: values.email,
          password: values.password,
        }
        await resAPI(createLogin,payload,(data:any)=>{
          toast(data.message)
          dispatch(addtoken({token:data.token}))
            navigate("/Dashboard")
      })
    setSubmitting(false);
  };
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#A67C00"
          fontFamily={"Jaldi, sans-serif"}
        >
          Sign in to Excuse Me
        </Typography>
        {/* <Socials />
        <Typography variant="body2" mt={1} fontFamily={"Jaldi, sans-serif"}>
          or use your email account
        </Typography> */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{ marginTop: 2, width: "50%" }}
            >
              <InputField
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                name="email"
                type="email"
                icon={
                  <MailOutlineIcon sx={{ color: "black", fontSize: "20px" }} />
                }
                error={Boolean(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-signup">
                  {errors.email}
                </FormHelperText>
              )}
              <InputField
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                name="password"
                type="password"
                icon={<LockIcon sx={{ color: "black", fontSize: "20px" }} />}
                error={Boolean(touched.password && errors.password)}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.password}
                </FormHelperText>
              )}
              <Typography
                variant="body1"
                textAlign="center"
                mt={1}
                fontFamily={"Jaldi, sans-serif"}
                sx={{ cursor: "pointer" }}
              >
                Forgot your password?
              </Typography>
              <Button
                disableElevation
                disabled={isSubmitting}
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: "#a67c00",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  px: 7.3,
                  py: 1,
                  fontSize: 20,
                  fontFamily: "Jaldi, sans-serif",
                }}
              >
                Log in
              </Button>
            </form>
          )}
        </Formik>
      </Grid>
      <LeftBox
        heading1={"Welcome Back!"}
        // heading2={"Don’t have an account?"}
        // buttonText={"Sign Up"}
        // path={"/SignUp"}
      />
    </Grid>
  );
};

export default Login;
