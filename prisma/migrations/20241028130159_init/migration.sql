/*
  Warnings:

  - You are about to drop the column `isPresent` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `isSupervisor` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `present` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "isPresent",
ADD COLUMN     "present" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "supervisorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "updatedAt",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "isSupervisor",
DROP COLUMN "updatedAt",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
