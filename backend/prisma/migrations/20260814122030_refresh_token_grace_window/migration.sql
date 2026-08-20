-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN     "replacedByPair" JSONB,
ADD COLUMN     "revokedAt" TIMESTAMP(3);
