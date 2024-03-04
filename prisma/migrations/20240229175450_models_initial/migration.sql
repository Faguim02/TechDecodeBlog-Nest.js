-- CreateTable
CREATE TABLE "Admn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "font_noticie" TEXT NOT NULL,
    "View" INTEGER NOT NULL
);
