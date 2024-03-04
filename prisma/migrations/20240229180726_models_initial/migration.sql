/*
  Warnings:

  - Added the required column `user_email` to the `Admn` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL
);
INSERT INTO "new_Admn" ("id", "user_name", "user_password") SELECT "id", "user_name", "user_password" FROM "Admn";
DROP TABLE "Admn";
ALTER TABLE "new_Admn" RENAME TO "Admn";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
