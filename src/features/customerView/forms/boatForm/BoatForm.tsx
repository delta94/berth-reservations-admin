import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ObjectSchema } from 'yup';
import { Button, TextInput } from 'hds-react';

import { BoatType, FormProps } from '../../../harborView/forms/types';
import { Boat } from '../../types';
import FormHeader from '../../../../common/formHeader/FormHeader';
import styles from './boatForm.module.scss';
import ConfirmationModal from '../../../../common/confirmationModal/ConfirmationModal';
import Select from '../../../../common/select/Select';
import { isNumber, isPositive, replaceCommaWithDot, replaceDotWithComma } from '../../../../common/utils/forms';

export interface BoatFormProps extends FormProps<Boat> {
  boatTypes: BoatType[];
}

interface BoatFormValues extends Omit<Boat, 'width' | 'length' | 'draught' | 'weight'> {
  width: string;
  length: string;
  draught?: string;
  weight?: string;
}

const getBoatValidationSchema = (t: TFunction, boatTypes: BoatType[]): ObjectSchema => {
  return Yup.object().shape({
    boatType: Yup.object().shape({
      id: Yup.string()
        .oneOf(boatTypes.map((boatType) => boatType.id))
        .required(t('forms.common.errors.required')),
    }),
    registrationNumber: Yup.string(),
    width: Yup.string()
      .test('isNumber', t('forms.common.errors.numberType'), (val) => isNumber(val))
      .test('isPositive', t('forms.common.errors.positive'), (val) => isPositive(val))
      .required(t('forms.common.errors.required')),
    length: Yup.string()
      .test('isNumber', t('forms.common.errors.numberType'), (val) => isNumber(val))
      .test('isPositive', t('forms.common.errors.positive'), (val) => isPositive(val))
      .required(t('forms.common.errors.required')),
    draught: Yup.string()
      .test('isNumber', t('forms.common.errors.numberType'), (val) => isNumber(val))
      .test('isPositive', t('forms.common.errors.positive'), (val) => isPositive(val)),
    weight: Yup.string()
      .test('isNumber', t('forms.common.errors.numberType'), (val) => isNumber(val))
      .test('isPositive', t('forms.common.errors.positive'), (val) => isPositive(val)),
  });
};

const transformValues = (values: BoatFormValues): Boat => {
  const { width, length, draught, weight } = values;
  return {
    ...values,
    width: parseFloat(replaceCommaWithDot(width)),
    length: parseFloat(replaceCommaWithDot(length)),
    draught: draught ? parseFloat(replaceCommaWithDot(draught)) : null,
    weight: weight ? parseFloat(replaceCommaWithDot(weight)) : null,
  };
};

const BoatForm = ({ onCancel, onDelete, onSubmit, isSubmitting, initialValues, boatTypes }: BoatFormProps) => {
  const { t } = useTranslation();
  const validationSchema = getBoatValidationSchema(t, boatTypes);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const initial: BoatFormValues = initialValues
    ? {
        ...initialValues,
        width: initialValues.width ? replaceDotWithComma(String(initialValues.width)) : '',
        length: initialValues.length ? replaceDotWithComma(String(initialValues.length)) : '',
        draught: initialValues.draught ? replaceDotWithComma(String(initialValues.draught)) : '',
        weight: initialValues.weight ? replaceDotWithComma(String(initialValues.weight)) : '',
      }
    : (({ boatType: boatTypes[0] } as unknown) as BoatFormValues);

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
            title={t('forms.boat.title')}
            isSubmitting={isSubmitting}
            onDelete={onDelete ? () => setIsDeleteModalOpen(true) : undefined}
            onDeleteText={t('forms.boat.delete')}
          />

          <Select
            id="boatType.id"
            label={t('forms.boat.boatType')}
            value={values.boatType.id}
            options={boatTypes.map((boatType) => {
              return {
                label: boatType.name ?? '-',
                value: boatType.id,
              };
            })}
            onChange={handleChange}
            required
          />
          <TextInput
            id="registrationNumber"
            onChange={handleChange}
            value={values.registrationNumber}
            label={t('forms.boat.registrationNumber')}
            invalid={!!errors.registrationNumber}
            helperText={errors.registrationNumber}
          />

          <hr />

          <div className={styles.horizontal}>
            <TextInput
              id="width"
              value={values.width}
              onChange={handleChange}
              label={t('forms.boat.width')}
              invalid={!!errors.width}
              helperText={errors.width}
            />
            <TextInput
              id="length"
              value={values.length}
              onChange={handleChange}
              label={t('forms.boat.length')}
              invalid={!!errors.length}
              helperText={errors.length}
            />
            <TextInput
              id="draught"
              onChange={handleChange}
              value={values.draught}
              label={t('forms.boat.draught')}
              invalid={!!errors.draught}
              helperText={errors.draught}
            />
            <TextInput
              id="weight"
              onChange={handleChange}
              value={values.weight}
              label={t('forms.boat.weight')}
              invalid={!!errors.weight}
              helperText={errors.weight}
            />
          </div>

          <hr />

          <TextInput
            id="name"
            onChange={handleChange}
            value={values.name}
            label={t('forms.boat.name')}
            invalid={!!errors.name}
            helperText={errors.name}
          />
          <TextInput
            id="model"
            onChange={handleChange}
            value={values.model}
            label={t('forms.boat.model')}
            invalid={!!errors.model}
            helperText={errors.model}
          />

          <div className={styles.formActionButtons}>
            <Button theme="coat" variant="secondary" disabled={isSubmitting} color="supplementary" onClick={onCancel}>
              {t('forms.common.cancel')}
            </Button>
            <Button theme="coat" type="submit" disabled={isSubmitting}>
              {t('forms.common.update')}
            </Button>
          </div>

          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            title={t('forms.boat.title')}
            infoText={t('forms.boat.deleteConfirmation.infoText')}
            onCancelText={t('forms.common.cancel')}
            onConfirmText={t('forms.boat.delete')}
            warningText={t('forms.boat.deleteConfirmation.warningText')}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => onDelete?.(transformValues(values))}
            className={styles.confirmationModal}
          />
        </form>
      )}
    </Formik>
  );
};

export default BoatForm;
