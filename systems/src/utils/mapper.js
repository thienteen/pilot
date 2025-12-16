const { mapSystemAToB } = require('./mapSystemAToB');

// Remove Vietnamese accents and normalize to ASCII.
function removeVietnameseAccents(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove combining accents
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function generateEmailFromName(name = '') {
  const noAccents = removeVietnameseAccents(name).toLowerCase().trim();
  const withDots = noAccents.replace(/\s+/g, '.');
  const cleaned = withDots.replace(/[^a-z0-9.]/g, '');
  if (!cleaned) return '';
  return `${cleaned}@company.com`;
}

// Mapping between System A payload and System B payload.
// System A: { id, ho_ten, ngay_sinh, luong }
// System B: { userId, fullName, email, birthDate, salary }
const defaultFieldMappings = {
  userId: 'id',
  fullName: 'ho_ten',
  email: {
    path: 'ho_ten',
    transform: (value) => generateEmailFromName(value),
  },
  birthDate: 'ngay_sinh',
  salary: 'luong',
};

// Map a single System A record to a single System B record.
function mapFromSystemA(payload, fieldMappings = defaultFieldMappings) {
  if (!payload) return {};
  return mapSystemAToB(payload, fieldMappings);
}

module.exports = {
  mapFromSystemA,
  defaultFieldMappings,
  removeVietnameseAccents,
  generateEmailFromName,
};

