/*
Venepaikka
- Leveys (m), select (...)
- Yksityinen (€), number
- Yritys (€), number
- Aika, select (Kausi, 1 kk, ...)

Satamapalvelut
- Palvelu, select (Vesi)
- Hinta, number
- Yksikkö, select (€, %)
- Aika, select (Kausi, 1 kk, ...)

Talvisäilytyspaikka
- Alue, select (Kaisaniemi, ...)
- Yksityinen (€/m2), number
- Yritys (€/m2), number
- Aika, select (Kausi, 1 kk, ...)

Lisäpalvelut
- Palvelu, select (Pysäköintilupa, ...)
- Hinta (€), number
- ALV, select (24 %, ...)
- Aika, select (Kausi, 1 kk, ...)
 */

import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from './PricingPage';

const berthPrices: BerthPrice[] = [
  {
    id: '1',
    width: 2,
    privateCustomer: 116,
    company: 236,
    period: 'kausi',
  },
  {
    id: '2',
    width: 2.5,
    privateCustomer: 158,
    company: 326,
    period: 'kausi',
  },
  {
    id: '3',
    width: 2.75,
    privateCustomer: 178,
    company: 178,
    period: 'kausi',
  },
  {
    id: '4',
    width: 3,
    privateCustomer: 200,
    company: 200,
    period: 'kausi',
  },
  {
    id: '5',
    width: 3.5,
    privateCustomer: 242,
    company: 242,
    period: 'kausi',
  },
  {
    id: '6',
    width: 4,
    privateCustomer: 284,
    company: 284,
    period: 'kausi',
  },
  {
    id: '7',
    width: 4.5,
    privateCustomer: 326,
    company: 326,
    period: 'kausi',
  },
  {
    id: '8',
    width: 5,
    privateCustomer: 368,
    company: 368,
    period: 'kausi',
  },
  {
    id: '9',
    width: 5.5,
    privateCustomer: 410,
    company: 410,
    period: 'kausi',
  },
  {
    id: '10',
    width: 6,
    privateCustomer: 452,
    company: 452,
    period: 'kausi',
  },
  {
    id: '11',
    width: 7,
    privateCustomer: 536,
    company: 326,
    period: 'kausi',
  },
];

const winterStoragePrices: WinterStoragePrice[] = [
  {
    id: '1',
    area: 'Kaisaniemi',
    privateCustomer: 8.5,
    company: 17,
    period: 'kausi',
  },
  {
    id: '2',
    area: 'Lähteelä',
    privateCustomer: 8.5,
    company: 17,
    period: 'kausi',
  },
  {
    id: '3',
    area: 'Ruusuniemi 2',
    privateCustomer: 8.5,
    company: 17,
    period: 'kausi',
  },
  {
    id: '4',
    area: 'Pajalahti',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '5',
    area: 'Ruusuniemi 1',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '6',
    area: 'Jätkäsaari',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '7',
    area: 'Puotila',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '8',
    area: 'Marjaniemi',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '9',
    area: 'Strömsinlahti',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '10',
    area: 'Merisatama (läntinen)',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '11',
    area: 'Rajasaari (iso)',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '12',
    area: 'Iso-Sarvasto',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '13',
    area: 'Laivalahti',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '14',
    area: 'Porslahti',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '15',
    area: 'Merisatama (itä)',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
  {
    id: '16',
    area: 'Rajasaari (E,F,G)',
    privateCustomer: 10.6,
    company: 21.2,
    period: 'kausi',
  },
];

const harborServices: HarborService[] = [
  {
    id: '1',
    service: 'Kiinnitys',
    price: 28,
    period: 'kausi',
  },
  {
    id: '2',
    service: 'Sähkö',
    price: 28,
    period: 'kausi',
  },
  {
    id: '3',
    service: 'Vesi',
    price: 28,
    period: 'kausi',
  },
  {
    id: '4',
    service: 'Jätehuolto',
    price: 28,
    period: 'kausi',
  },
  {
    id: '5',
    service: 'Portti',
    price: 28,
    period: 'kausi',
  },
  {
    id: '6',
    service: 'Valaistus',
    price: 28,
    period: 'kausi',
  },
];

const additionalServices: AdditionalService[] = [
  {
    id: '1',
    service: 'Trailerin kesäsäilytys',
    price: 24,
    tax: 0.24,
    period: 'kausi',
  },
  {
    id: '2',
    service: 'Pysäköintilupa',
    price: 24,
    tax: 0.24,
    period: 'kausi',
  },
  {
    id: '3',
    service: 'Pysäköintilupa',
    price: 24,
    tax: 0.24,
    period: 'kausi',
  },
  {
    id: '4',
    service: 'Jollapaikka',
    price: 24,
    tax: 0.24,
    period: 'kausi',
  },
];

export default {
  berthPrices,
  winterStoragePrices,
  harborServices,
  additionalServices,
};
