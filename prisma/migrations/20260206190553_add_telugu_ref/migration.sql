/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - Added the required column `greeting` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerBio` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verseEnglish` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verseRefEnglish` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verseRefTelugu` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verseTelugu` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "endDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "greeting" TEXT NOT NULL,
ADD COLUMN     "speakerBio" TEXT NOT NULL,
ADD COLUMN     "speakerImage" TEXT,
ADD COLUMN     "speakerName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verseEnglish" TEXT NOT NULL,
ADD COLUMN     "verseRefEnglish" TEXT NOT NULL,
ADD COLUMN     "verseRefTelugu" TEXT NOT NULL,
ADD COLUMN     "verseTelugu" TEXT NOT NULL;
