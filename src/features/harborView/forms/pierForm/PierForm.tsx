import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TFunction } from 'i18next';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';
import { TextInput, Button, Checkbox } from 'hds-react';

import Text from '../../../../common/text/Text';
import styles from './pierForm.module.scss';
import { BoatType, FormProps, Pier } from '../types';
import Grid from '../../../../common/grid/Grid';
import FormHeader from '../../../../common/formHeader/FormHeader';
import ConfirmationModal from '../../../../common/confirmationModal/ConfirmationModal';

interface PierFormProps extends FormProps<Pier> {
  suitableBoatTypeOptions: BoatType[];
  onSubmitText?: string;
}

const getPierValidationSchema = (t: TFunction, suitableBoatTypeOptions: BoatType[]): ObjectSchema => {
  return Yup.object().shape({
    identifier: Yup.string().required(t('forms.common.errors.required')),
    suitableBoatTypes: Yup.array().of(Yup.string().oneOf(suitableBoatTypeOptions.map((boatType) => boatType.id))),
    mooring: Yup.boolean(),
    wasteCollection: Yup.boolean(),
    lighting: Yup.boolean(),
    electricity: Yup.boolean(),
    water: Yup.boolean(),
    gate: Yup.boolean(),
    personalElectricity: Yup.boolean(),
  });
};

const PierForm = ({
  onSubmit,
  onDelete,
  onCancel,
  suitableBoatTypeOptions,
  onSubmitText,
  isSubmitting,
  initialValues,
}: PierFormProps) => {
  const { t } = useTranslation();
  const validationSchema = getPierValidationSchema(t, suitableBoatTypeOptions);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const initial: Pier = {
    identifier: '',
    suitableBoatTypes: [],
    mooring: false,
    wasteCollection: false,
    lighting: false,
    electricity: false,
    gate: false,
    personalElectricity: false,
    water: false,
    ...initialValues,
  };

  return (
    <Formik
      initialValues={initial}
      onSubmit={(values) => onSubmit?.(values)}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormHeader
            title={t('forms.pier.title')}
            isSubmitting={isSubmitting}
            onDelete={onDelete ? () => setIsDeleteModalOpen(true) : undefined}
            onDeleteText={t('forms.pier.delete')}
          />

          <TextInput
            id="identifier"
            type="text"
            value={values.identifier}
            onChange={handleChange}
            labelText={t('forms.pier.identifier')}
            invalid={!!errors.identifier}
            helperText={errors.identifier}
          />

          <Grid colsCount={2}>
            <div className={styles.checkboxes}>
              <Text weight="bold" size="s">
                {t('forms.pier.services')}
              </Text>
              {['wasteCollection', 'gate', 'electricity', 'lighting', 'water'].map((keyForCheckbox, id) => (
                <Checkbox
                  key={id}
                  id={keyForCheckbox}
                  onChange={handleChange}
                  checked={values[keyForCheckbox as keyof Pier] as boolean}
                  labelText={t(`forms.pier.${keyForCheckbox}`)}
                />
              ))}
            </div>
            <div className={styles.checkboxes}>
              <Text weight="bold" size="s">
                {t('forms.pier.boatTypes')}
              </Text>
              {suitableBoatTypeOptions.map((boatType, id) => (
                <Checkbox
                  key={id}
                  id={`suitableBoatTypes.${id}`}
                  onChange={() => {
                    const set = new Set(values.suitableBoatTypes);
                    set.has(boatType.id) ? set.delete(boatType.id) : set.add(boatType.id);
                    handleChange({
                      target: {
                        id: 'suitableBoatTypes',
                        value: Array.from(set),
                      },
                    });
                  }}
                  checked={values.suitableBoatTypes && values.suitableBoatTypes.includes(boatType.id)}
                  labelText={boatType.name ?? ''}
                />
              ))}
            </div>
          </Grid>

          <Checkbox
            id="personalElectricity"
            onChange={handleChange}
            checked={values.personalElectricity}
            labelText={t('forms.pier.personalElectricity')}
          />

          <div className={styles.formActionButtons}>
            <Button variant="secondary" theme="black" disabled={isSubmitting} onClick={onCancel}>
              {t('forms.common.cancel')}
            </Button>
            <Button theme="coat" type="submit" disabled={isSubmitting}>
              {onSubmitText}
            </Button>
          </div>

          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            title={t('forms.pier.title')}
            infoText={t('forms.pier.deleteConfirmation.infoText', { pierIdentifier: values.identifier })}
            onCancelText={t('forms.common.cancel')}
            onConfirmText={t('forms.pier.')}
            warningText={t('forms.pier.deleteConfirmation.warningText')}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => onDelete?.(values)}
            className={styles.confirmationModal}
          />
        </form>
      )}
    </Formik>
  );
};

export default PierForm;
