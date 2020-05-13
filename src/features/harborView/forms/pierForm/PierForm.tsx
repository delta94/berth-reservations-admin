import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TFunction } from 'i18next';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';
import { TextInput, Button } from 'hds-react';

import Text from '../../../../common/text/Text';
import styles from './pierForm.module.scss';
import { BoatType, FormProps, Pier } from '../types';
import Grid from '../../../../common/grid/Grid';
import Checkbox from '../../../../common/checkbox/Checkbox';
import FormHeader from '../../../../common/formHeader/FormHeader';

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

const PierForm: React.FC<PierFormProps> = ({
  onSubmit,
  onDelete,
  onCancel,
  suitableBoatTypeOptions,
  onSubmitText,
  isSubmitting,
  initialValues,
}) => {
  const { t } = useTranslation();
  const validationSchema = getPierValidationSchema(t, suitableBoatTypeOptions);
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
            onDelete={onDelete ? () => onDelete(values) : undefined}
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
                  onChange={(event) =>
                    handleChange({
                      target: {
                        id: keyForCheckbox,
                        value: event.target.checked,
                      },
                    })
                  }
                  checked={values[keyForCheckbox as keyof Pier] as boolean}
                  label={t(`forms.pier.${keyForCheckbox}`)}
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
                  label={boatType.name ?? ''}
                />
              ))}
            </div>
          </Grid>

          <Checkbox
            onChange={(event) =>
              handleChange({
                target: {
                  id: 'personalElectricity',
                  value: event.target.checked,
                },
              })
            }
            checked={values.personalElectricity}
            label={t('forms.pier.personalElectricity')}
          />

          <div className={styles.formActionButtons}>
            <Button variant="secondary" theme="black" disabled={isSubmitting} onClick={onCancel}>
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

export default PierForm;
