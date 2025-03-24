import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LeftBox from "./LeftBox";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import InputField from "../../component/TextFields/TextFields";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { FormHelperText } from "@mui/material";
import { RestaurantSignup } from "../../Assets/Icons/Icons";
import { resAPI } from "../../utils/hooks/apiResponse";
import { useSignupMutation } from "../../store/rtk";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  restaurantName: string;
  branchName: string;
  city: string;
  submit: null;
}
const SignUp: React.FC = () => {
  const [createSignUp,{isLoading,isError}] = useSignupMutation()
  const navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const payload  = {
      name: values.name,
      email: values.email,
      password: values.password,
      phonenumber: values.phoneNumber,
      restaurant: values.restaurantName,
      branch: values.branchName,
      city: values.city,
    }
    await resAPI(createSignUp,payload,(data:any)=>{
      setTimeout(()=>{
        navigate("/Dashboard")
      },3000)
  })

    console.log(values, "values");
    setSubmitting(false);
  };
  return (
    <Grid container style={{ height: "100vh" }}>
      <LeftBox
        heading1={"Start New Journey!"}
        heading2={"Already have an account?"}
        buttonText={"Log In"}
        path={"/"}
      />
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
          Create Account
        </Typography>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            restaurantName: "",
            branchName: "",
            city: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Name is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
            phoneNumber: Yup.string()
              .max(255)
              .required("Phone Number is required"),
            restaurantName: Yup.string()
              .max(255)
              .required("Restaurant Name is required"),
            branchName: Yup.string()
              .max(255)
              .required("Branch Name is required"),
            city: Yup.string().max(255).required("City is required"),
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
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
                name="name"
                type="name"
                icon={<PersonIcon sx={{ color: "black", fontSize: "20px" }} />}
                error={Boolean(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="helper-text-name-signup">
                  {errors.name}
                </FormHelperText>
              )}
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
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="Phone No."
                name="phoneNumber"
                type="number"
                icon={<PhoneIcon sx={{ color: "black", fontSize: "20px" }} />}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <FormHelperText error id="helper-text-phoneNumber-signup">
                  {errors.phoneNumber}
                </FormHelperText>
              )}
              <InputField
                value={values.restaurantName}
                onChange={handleChange}
                placeholder="Restaurant Name"
                name="restaurantName"
                type="text"
                icon={<RestaurantSignup />}
                error={Boolean(touched.restaurantName && errors.restaurantName)}
              />
              {touched.restaurantName && errors.restaurantName && (
                <FormHelperText error id="helper-text-restaurantName-signup">
                  {errors.restaurantName}
                </FormHelperText>
              )}
              <InputField
                value={values.branchName}
                onChange={handleChange}
                placeholder="Branch Name"
                name="branchName"
                type="text"
                icon={
                  <MailOutlineIcon sx={{ color: "black", fontSize: "20px" }} />
                }
                error={Boolean(touched.branchName && errors.branchName)}
              />
              {touched.branchName && errors.branchName && (
                <FormHelperText error id="helper-text-branchName-signup">
                  {errors.branchName}
                </FormHelperText>
              )}
              <InputField
                value={values.city}
                onChange={handleChange}
                placeholder="City"
                name="city"
                type="text"
                icon={
                  <MailOutlineIcon sx={{ color: "black", fontSize: "20px" }} />
                }
                error={Boolean(touched.city && errors.city)}
              />
              {touched.city && errors.city && (
                <FormHelperText error id="helper-text-city-signup">
                  {errors.city}
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
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;
