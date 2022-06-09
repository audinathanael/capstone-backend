const domain = process.env.DOMAIn || 'api.autism';
const hostname = process.env.NODE_ENV !== 'production' ? 'localhost' : domain;

module.exports = hostname;