const salesMockSuccess = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const salesMockFail = [
  {
    "productId": 10,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const getSalesMock =  [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }

];

const getSalesByIdMock = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

module.exports = {
  salesMockSuccess,
  salesMockFail,
  getSalesMock,
  getSalesByIdMock,
};