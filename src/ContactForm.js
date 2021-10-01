import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;

// RegEx for phone number validation
const phoneRegExp = /^\d+$/;

// Schema for yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "*First names must have at least 2 characters")
    .max(100, "*First name can't be longer than 100 characters")
    .required("*First name is required"),
  lastName: Yup.string()
    .min(3, "*Last name must have at least 3 characters")
    .max(100, "*Last name can't be longer than 100 characters")
    .required("*Last name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .min(9, "*Phone number must have at least 9 numbers")
    .required("*Phone number required"),
  zipCode: Yup.string()
    .matches(phoneRegExp, "*Zip code is not valid")
    .required("*Zip code number required"),
});

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <CONTAINER className="shadow-lg">
      <h1>Please fill in this form</h1>
      {successMessage && (
        <h3 className="alert alert-success">{successMessage}</h3>
      )}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          zipCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          await setSuccessMessage("Your form was submitted!");
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <MYFORM onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="formFirstName">
              <Form.Label>First name :</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                className={
                  touched.firstName && errors.firstName ? "has-error" : null
                }
              />
              {touched.firstName && errors.firstName ? (
                <div className="error-message">{errors.firstName}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last name :</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                className={
                  touched.lastName && errors.lastName ? "has-error" : null
                }
              />
              {touched.lastName && errors.lastName ? (
                <div className="error-message">{errors.lastName}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "has-error" : null}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone :</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                className={touched.phone && errors.phone ? "has-error" : null}
              />
              {touched.phone && errors.phone ? (
                <div className="error-message">{errors.phone}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>Zip code :</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                placeholder="Zip code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipCode}
                className={
                  touched.zipCode && errors.zipCode ? "has-error" : null
                }
              />
              {touched.zipCode && errors.zipCode ? (
                <div className="error-message">{errors.zipCode}</div>
              ) : null}
            </Form.Group>
            {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
            <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default ContactForm;
