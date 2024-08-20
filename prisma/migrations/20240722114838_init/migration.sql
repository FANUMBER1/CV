-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "content" TEXT,
    "describe" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "img" TEXT,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purpose" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "name" TEXT,
    "describe" TEXT,

    CONSTRAINT "purpose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "time" TEXT,
    "userid" INTEGER NOT NULL,
    "postid" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "content" TEXT,
    "describe" TEXT,
    "time" TEXT,
    "img" TEXT,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categori" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "categori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soicial" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "img" TEXT,
    "link" TEXT,

    CONSTRAINT "soicial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "Subject" TEXT,
    "Message" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "avata" TEXT,
    "email" TEXT,
    "pass" TEXT,
    "roleid" INTEGER NOT NULL,
    "position" TEXT,
    "describe" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_categori" (
    "postid" INTEGER NOT NULL,
    "categorid" INTEGER NOT NULL,

    CONSTRAINT "post_categori_pkey" PRIMARY KEY ("postid","categorid")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "position" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categori" ADD CONSTRAINT "post_categori_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categori" ADD CONSTRAINT "post_categori_categorid_fkey" FOREIGN KEY ("categorid") REFERENCES "categori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
