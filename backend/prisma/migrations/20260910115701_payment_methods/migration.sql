-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'AWAITING_PAYMENT';

-- AlterTable
ALTER TABLE "checkout_attempts" ADD COLUMN     "paymentMethod" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "paymentNote" TEXT;
