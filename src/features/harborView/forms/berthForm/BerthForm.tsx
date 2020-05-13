import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Button, TextInput } from 'hds-react';
import { ObjectSchema } from 'yup';

import { Berth, FormProps } from '../types';
import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';
import Grid from '../../../../common/grid/Grid';
import Select from '../../../../common/select/Select';
import Checkbox from '../../../../common/checkbox/Checkbox';
import styles from './berthForm.module.scss';
import { Pier } from '../../utils/utils';
import FormHeader from '../../../../common/formHeader/FormHeader';

interface BerthFormProps extends FormProps<Berth> {
  isEditing?: boolean;
  onSubmitText?: string;
  pierOptions: Pier[];
}

const getBerthValidationSchema = (t: TFunction, pierOptions: Pier[]): ObjectSchema => {
  return Yup.object().shape({
    pierId: Yup.string()
      .oneOf(pierOptions.map((pier) => pier.id))
      .required(t('forms.common.errors.required')),
    number: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .min(0, t('forms.common.errors.nonNegative'))
      .integer(t('forms.common.errors.integer'))
      .required(t('forms.common.errors.required')),
    width: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .positive(t('forms.common.errors.positive'))
      .required(t('forms.common.errors.required')),
    length: Yup.number()
      .typeError(t('forms.common.errors.numberType'))
      .positive(t('forms.common.errors.positive'))
      .required(t('forms.common.errors.required')),
    mooringType: Yup.string().oneOf(Object.keys(BerthMooringType)).required(t('forms.common.errors.required')),
  });
};

const transformValues = (values: any): Berth => {
  const { number, width, length } = values;
  return {
    ...values,
    number: parseInt(number),
    width: parseFloat(width),
    length: parseFloat(length),
  };
};

const BerthForm: React.FC<BerthFormProps> = ({
  isEditing = false,
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
  onDelete,
  onSubmitText,
  pierOptions,
}) => {
  const { t } = useTranslation();
  const validationSchema = getBerthValidationSchema(t, pierOptions);

  const initial: Berth = initialValues ?? {
    pierId: pierOptions[0].id,
    mooringType: BerthMooringType.DINGHY_PLACE,
    comment: '',
    isActive: true,
  };

  return (
    <Formik
      initialValues={initial}
      onSubmit={(values) => onSubmit?.(transformValues(values))}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormHeader
            title={t('forms.berth.title')}
            isSubmitting={isSubmitting}
            onDelete={onDelete ? () => onDelete(values) : undefined}
            onDeleteText={t('forms.berth.delete')}
          />
          <Grid colsCount={3} className={styles.grid}>
            <Select
              id="pierId"
              value={values.pierId}
              options={pierOptions.map((pier) => {
                return {
                  label: pier.identifier,
                  value: pier.id,
                };
              })}
              onChange={handleChange}
              labelText={t('forms.berth.pier')}
              required
              disabled={isEditing}
            />
            <TextInput
              id="number"
              value={values.number ? String(values.number) : ''}
              onChange={handleChange}
              labelText={t('forms.berth.number')}
              invalid={!!errors.number}
              helperText={errors.number}
              disabled={isEditing}
            />
            <div />
            <TextInput
              id="width"
              value={values.width ? String(values.width) : ''}
              onChange={handleChange}
              labelText={t('forms.berth.width')}
              invalid={!!errors.width}
              helperText={errors.width}
            />
            <TextInput
              id="length"
              value={values.length ? String(values.length) : ''}
              onChange={handleChange}
              labelText={t('forms.berth.length')}
              invalid={!!errors.length}
              helperText={errors.length}
            />
            <TextInput
              id="depth"
              onChange={handleChange}
              value={values.depth ? String(values.depth) : ''}
              labelText={t('forms.berth.depth')}
              invalid={!!errors.depth}
              helperText={errors.depth}
              readOnly
            />
          </Grid>

          <hr />

          <Select
            id="mooringType"
            value={values.mooringType}
            labelText={t('forms.berth.mooringType')}
            options={Object.keys(BerthMooringType).map((mooringType) => {
              return {
                label: t([`common.mooringTypes.${mooringType}`, mooringType]),
                value: mooringType,
              };
            })}
            onChange={handleChange}
            required
          />
          <TextInput id="comment" onChange={handleChange} value={values.comment} labelText={t('forms.berth.comment')} />
          <Checkbox
            onChange={(event) =>
              handleChange({
                target: {
                  id: 'isActive',
                  value: event.target.checked,
                },
              })
            }
            checked={values.isActive}
            label={t('forms.berth.isActive')}
          />
          <div className={styles.formActionButtons}>
            <Button
              variant="secondary"
              theme="black"
              disabled={isSubmitting}
              color={'supplementary'}
              onClick={onCancel}
            >
              {t('forms.common.cancel')}
            </Button>
            <Button theme="coat" type="submit" disabled={isSubmitting}>
              {onSubmitText}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BerthForm;
