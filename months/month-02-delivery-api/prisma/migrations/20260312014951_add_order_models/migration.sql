-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'COOKING', 'READY_FOR_PICKUP', 'DELIVERED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `courierId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_courierId_fkey` FOREIGN KEY (`courierId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
