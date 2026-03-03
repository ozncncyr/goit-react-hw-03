import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

const ContactForm = ({ onSubmit }) => {
  const nameId = nanoid();
  const numberId = nanoid();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in format XXX-XX-XX")
      .required("Required"),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required("Required"),
  });

  const handleSubmit = (values, evt) => {
    onSubmit(values.name, values.number);
    evt.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <div className={css.inputContainer}>
            <label className={css.label} htmlFor={nameId}>
              Name
            </label>
            <Field
              id={nameId}
              className={css.input}
              type="text"
              name="name"
              placeholder="Enter name"
            />
          </div>
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.field}>
          <div className={css.inputContainer}>
            <label className={css.label} htmlFor={numberId}>
              Number
            </label>
            <Field
              id={numberId}
              className={css.input}
              type="tel"
              name="number"
              placeholder="Enter number"
            />
          </div>
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
