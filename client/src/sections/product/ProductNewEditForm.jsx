import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
//
import { Card, Grid, Stack, Divider } from "@mui/material";

import FormProvider, { RHFTextField } from "../../components/hook-form";

// ----------------------------------------------------------------------

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  quantity: Yup.string().required("Quantity is required"),
});

function ProductNewEditForm({ isEdit = false, currentUser, handleSubmited }) {
  const defaultValues = useMemo(
    () => ({
      title: currentUser?.availableColors || "",
      description: currentUser?.availableColors || "",
      quantity: currentUser?.quantity || 0,
      amount: currentUser?.amount || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (inputData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const productData = {
        title: inputData.title,
        description: inputData.description,
        quantity: inputData.quantity,
        amount: inputData.amount,
      };

      handleSubmited(productData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <RHFTextField name="title" label="Title *" />
                </Grid>
                <Grid item xs={4}>
                  <RHFTextField name="description" label="Description *" />
                </Grid>
                <Grid item xs={2}>
                  <RHFTextField type="number" name="amount" label="Amount *" />
                </Grid>
                <Grid item xs={2}>
                  <RHFTextField
                    type="number"
                    name="quantity"
                    label="Quantity *"
                  />
                </Grid>
              </Grid>

              <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="soft"
                  loading={isSubmitting}
                >
                  {!isEdit ? "Submit" : "Save Changes"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

ProductNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  handleSubmited: PropTypes.func,
  handleData: PropTypes.func,
};

export default connect(null, {})(ProductNewEditForm);
