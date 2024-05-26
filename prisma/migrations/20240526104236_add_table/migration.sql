-- CreateTable
CREATE TABLE "Clothes" (
    "title" VARCHAR(100) NOT NULL,
    "id" VARCHAR(100) NOT NULL,
    "price" BIGINT NOT NULL,
    "image" VARCHAR(100),
    "createAt" TIMESTAMP,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Clothes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" VARCHAR(100) NOT NULL,
    "createAt" DATE NOT NULL,
    "idClothes" VARCHAR(100) NOT NULL,
    "amount" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "username" VARCHAR(100) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_idClothes_fkey" FOREIGN KEY ("idClothes") REFERENCES "Clothes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
