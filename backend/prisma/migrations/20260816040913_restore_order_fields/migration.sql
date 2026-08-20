-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "billingAddress" JSONB,
ADD COLUMN     "customerCompany" TEXT,
ADD COLUMN     "customerGstin" TEXT,
ADD COLUMN     "dispatchedAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "shippingAddress" JSONB,
ADD COLUMN     "shopifyCheckoutUrl" TEXT,
ADD COLUMN     "shopifyOrderId" TEXT,
ADD COLUMN     "zohoInvoiceId" TEXT;
