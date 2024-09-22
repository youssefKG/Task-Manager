import { Formik, Form } from "formik";

const FormWrapper = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...props
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form {...props}>{children}</Form>
    </Formik>
  );
};

export default FormWrapper;
