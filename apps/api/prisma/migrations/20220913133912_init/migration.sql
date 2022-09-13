-- CreateEnum
CREATE TYPE "experience" AS ENUM ('junior', 'mid', 'senior');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOfferLibrary" (
    "offerId" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("offerId","userId")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "experience_level" "experience" NOT NULL,
    "salary" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "company_url" VARCHAR(255),
    "skills" VARCHAR(255),
    "published_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserOfferLibrary" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
