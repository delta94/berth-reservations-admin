import React from 'react';
import { useTranslation } from 'react-i18next';

import PricingPage from './PricingPage';
import {
  formatPrice,
  formatPercentage,
  formatDimension,
} from '../../common/utils/format';

const PricingPageContainer: React.SFC = () => {
  const { i18n } = useTranslation();

  const harborData = [
    {
      id: '1',
      width: formatDimension(2, i18n.language),
      privateCustomer: formatPrice(116, i18n.language),
      company: formatPrice(236, i18n.language),
      period: 'kausi',
    },
    {
      id: '2',
      width: formatDimension(2.5, i18n.language),
      privateCustomer: formatPrice(158, i18n.language),
      company: formatPrice(326, i18n.language),
      period: 'kausi',
    },
    {
      id: '3',
      width: formatDimension(2.75, i18n.language),
      privateCustomer: formatPrice(178.85, i18n.language),
      company: formatPrice(178.85, i18n.language),
      period: 'kausi',
    },
    {
      id: '4',
      width: formatDimension(3, i18n.language),
      privateCustomer: formatPrice(200, i18n.language),
      company: formatPrice(200, i18n.language),
      period: 'kausi',
    },
    {
      id: '5',
      width: formatDimension(3.5, i18n.language),
      privateCustomer: formatPrice(242, i18n.language),
      company: formatPrice(242, i18n.language),
      period: 'kausi',
    },
    {
      id: '6',
      width: formatDimension(4, i18n.language),
      privateCustomer: formatPrice(284, i18n.language),
      company: formatPrice(284, i18n.language),
      period: 'kausi',
    },
    {
      id: '7',
      width: formatDimension(4.5, i18n.language),
      privateCustomer: formatPrice(326, i18n.language),
      company: formatPrice(326, i18n.language),
      period: 'kausi',
    },
    {
      id: '8',
      width: formatDimension(5, i18n.language),
      privateCustomer: formatPrice(368, i18n.language),
      company: formatPrice(368, i18n.language),
      period: 'kausi',
    },
    {
      id: '9',
      width: formatDimension(5.5, i18n.language),
      privateCustomer: formatPrice(410, i18n.language),
      company: formatPrice(410, i18n.language),
      period: 'kausi',
    },
    {
      id: '10',
      width: formatDimension(6, i18n.language),
      privateCustomer: formatPrice(452, i18n.language),
      company: formatPrice(452, i18n.language),
      period: 'kausi',
    },
    {
      id: '11',
      width: formatDimension(7, i18n.language),
      privateCustomer: formatPrice(536, i18n.language),
      company: formatPrice(326, i18n.language),
      period: 'kausi',
    },
  ];

  const winterStorageData = [
    {
      id: '1',
      area: 'Kaisaniemi',
      privateCustomer: formatPrice(8.5, i18n.language),
      company: formatPrice(17, i18n.language),
      period: 'kausi',
    },
    {
      id: '2',
      area: 'Lähteelä',
      privateCustomer: formatPrice(8.5, i18n.language),
      company: formatPrice(17, i18n.language),
      period: 'kausi',
    },
    {
      id: '3',
      area: 'Ruusuniemi 2',
      privateCustomer: formatPrice(8.5, i18n.language),
      company: formatPrice(17, i18n.language),
      period: 'kausi',
    },
    {
      id: '4',
      area: 'Pajalahti',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '5',
      area: 'Ruusuniemi 1',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '6',
      area: 'Jätkäsaari',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '7',
      area: 'Puotila',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '8',
      area: 'Marjaniemi',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '9',
      area: 'Strömsinlahti',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '10',
      area: 'Merisatama (läntinen)',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '11',
      area: 'Rajasaari (iso)',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '12',
      area: 'Iso-Sarvasto',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '13',
      area: 'Laivalahti',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kause',
    },
    {
      id: '14',
      area: 'Porslahti',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '15',
      area: 'Merisatama (itä)',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
    {
      id: '16',
      area: 'Rajasaari (E,F,G)',
      privateCustomer: formatPrice(10.6, i18n.language),
      company: formatPrice(21.2, i18n.language),
      period: 'kausi',
    },
  ];

  const harborServices = [
    {
      id: '1',
      service: 'Kiinnitys',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
    {
      id: '2',
      service: 'Sähkö',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
    {
      id: '3',
      service: 'Vesi',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
    {
      id: '4',
      service: 'Jätehuolto',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
    {
      id: '5',
      service: 'Portti',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
    {
      id: '6',
      service: 'Valaistus',
      price: formatPrice(28, i18n.language),
      period: 'kausi',
    },
  ];

  const otherServices = [
    {
      id: '1',
      service: 'Trailerin kesäsäilytys',
      price: formatPrice(24, i18n.language),
      tax: formatPercentage(0.24, i18n.language),
      period: 'kausi',
    },
    {
      id: '2',
      service: 'Pysäköintilupa',
      price: formatPrice(24, i18n.language),
      tax: formatPercentage(0.24, i18n.language),
      period: 'kausi',
    },
    {
      id: '3',
      service: 'Pysäköintilupa',
      price: formatPrice(24, i18n.language),
      tax: formatPercentage(0.24, i18n.language),
      period: 'kausi',
    },
    {
      id: '4',
      service: 'Jollapaikka',
      price: formatPrice(24, i18n.language),
      tax: formatPercentage(0.24, i18n.language),
      period: 'kausi',
    },
  ];

  return (
    <PricingPage
      harborData={harborData}
      winterStorageData={winterStorageData}
      harborServices={harborServices}
      otherServices={otherServices}
    />
  );
};

export default PricingPageContainer;
