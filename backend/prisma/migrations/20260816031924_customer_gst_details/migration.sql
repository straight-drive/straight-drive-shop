/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `dispatchedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayOrderId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayPaymentId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyCheckoutUrl` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyOrderId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `zohoInvoiceId` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checkout_attempts" ADD COLUMN     "customerCompany" TEXT,
ADD COLUMN     "customerGstin" TEXT;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "billingAddress",
DROP COLUMN "dispatchedAt",
DROP COLUMN "paidAt",
DROP COLUMN "paymentMethod",
DROP COLUMN "razorpayOrderId",
DROP COLUMN "razorpayPaymentId",
DROP COLUMN "shippingAddress",
DROP COLUMN "shopifyCheckoutUrl",
DROP COLUMN "shopifyOrderId",
DROP COLUMN "zohoInvoiceId";
