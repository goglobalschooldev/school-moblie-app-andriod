import { gql } from "@apollo/client";

export const INVOICE_BY_STUDENT = gql`
query GetInvoiceBystudentIdWithPagination($studentId: ID) {
  getInvoiceBystudentIdWithPagination(studentId: $studentId) {
    invoices {
      _id
      Amount
      createdAt
      invoiceId
      paidStatus
      netAmount
      grossAmount
      startDate
      endDate
      month
      groupFeeType
      additionalFee {
        _id
        countMonth
        incomeHead {
          _id
          incomeHead
          price
          unit
          incomeType
          note
        }
        additionalFeeTotal
        total
        discount
      }
      academicTermId {
        _id
      }
      quarter
    }
  }
}
`;
