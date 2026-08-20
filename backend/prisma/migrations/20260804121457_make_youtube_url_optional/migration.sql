-- AlterTable
ALTER TABLE "product_videos" ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "youtubeUrl" DROP NOT NULL;
