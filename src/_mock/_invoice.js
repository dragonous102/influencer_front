import { add, subDays } from 'date-fns';

import { _mock } from './_mock';
import { _addressBooks } from './_others';

// ----------------------------------------------------------------------

export const INVOICE_STATUS_OPTIONS = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'draft', label: 'Draft' },
];

export const INVOICE_SERVICE_OPTIONS = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.role(index),
  price: _mock.number.price(index),
}));

export const PATIENT_LIST = ['Julian Delgado', 'Clara vernet', 'Diago'];

const ITEMS = [...Array(3)].map((__, index) => {
  const total = INVOICE_SERVICE_OPTIONS[index].price * _mock.number.nativeS(index);

  return {
    id: _mock.id(index),
    total,
    title: _mock.productName(index),
    description: _mock.sentence(index),
    price: INVOICE_SERVICE_OPTIONS[index].price,
    service: INVOICE_SERVICE_OPTIONS[index].name,
    quantity: _mock.number.nativeS(index),
  };
});

export const _invoices1 = [...Array(20)].map((_, index) => {
  const taxes = _mock.number.price(index + 1);

  const discount = _mock.number.price(index + 2);

  const shipping = _mock.number.price(index + 3);

  const subTotal = ITEMS.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subTotal - shipping - discount + taxes;

  const status =
    (index % 2 && 'paid') || (index % 3 && 'pending') || (index % 4 && 'overdue') || 'draft';

  return {
    id: _mock.id(index),
    taxes,
    status,
    discount,
    shipping,
    subTotal,
    totalAmount,
    items: ITEMS,
    invoiceNumber: `INV-199${index}`,
    invoiceFrom: _addressBooks[index],
    invoiceTo: _addressBooks[index + 1],
    sent: _mock.number.nativeS(index),
    createDate: subDays(new Date(), index),
    dueDate: add(new Date(), { days: index + 15, hours: index }),
  };
});

export const _invoices = [...Array(20)].map((_, index) => {
  return {
    id: _mock.id(index),
    patient_name: 'Julian Delgado',
    doctor_name: 'Elmostafa Elkhiar, D.C.',
    collaborator_name: '',
    visit_date: '04/27/2020',
    facility: 'Elkhiar Chiropractic',
    activity: 'Initial chiropractic evaluation',
    signer: 'Elmostafa Elkhiar, D.C.',
    signed_date: '08/07/2020',
    file_name: 'alidpaint.pdf',
    summary: {
      'Date of injury and mechanism and cure content':
        'Personal injury at Stater Bros. Markets on 04/25/2020. Patient was getting a cart when an employee pushing carts struck him from behind.',
      'History of illness':
        'Pain began immediately following the accident. No prior medical treatment for this injury.',
      'Key physical exam findings':
        'Severe tenderness and myospasm of thoracic paraspinal muscles at T4-T8. Moderate to severe tenderness of lumbar spinous processes at L1-L4 and paraspinal muscles. Restricted lumbar ROM with pain. Positive straight leg raise at 20 degrees bilaterally.',
      'Diagnoses/assessment':
        '1. Nervousness 2. Myalgia 3. Thoracic segmental dysfunction 4. Thoracic pain 5. Lumbar segmental dysfunction 6. Lumbago 7. Lumbar radiculopathy 8. Sleep disorder',
      'Treatment plan and recommendations':
        'Chiropractic manipulation/adjustment and soft tissue physiotherapy 3x/week. Medical/pain management consult. X-rays and MRI of lumbar spine. Re-evaluate in 4 weeks.',
      'Follow up timeframe': '4 weeks',
    },
  };
});
