-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" VARCHAR(255),
    "ip" VARCHAR(45),
    "userAgent" TEXT,
    "browser" VARCHAR(50),
    "os" VARCHAR(50),
    "device" VARCHAR(50),
    "referer" TEXT,
    "path" VARCHAR(500) NOT NULL,
    "country" VARCHAR(100),
    "city" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visitors_createdAt_idx" ON "visitors"("createdAt");

-- CreateIndex
CREATE INDEX "visitors_path_idx" ON "visitors"("path");

-- CreateIndex
CREATE INDEX "visitors_ip_idx" ON "visitors"("ip");

-- CreateIndex
CREATE INDEX "visitors_sessionId_idx" ON "visitors"("sessionId");

-- CreateIndex
CREATE INDEX "visitors_userId_idx" ON "visitors"("userId");

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
