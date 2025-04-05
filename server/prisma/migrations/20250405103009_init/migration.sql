-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintAccount" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mint_address" TEXT NOT NULL,
    "token_name" TEXT NOT NULL,

    CONSTRAINT "MintAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- AddForeignKey
ALTER TABLE "MintAccount" ADD CONSTRAINT "MintAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
