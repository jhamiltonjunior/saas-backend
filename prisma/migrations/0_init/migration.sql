-- CreateTable
CREATE TABLE "Boards" (
    "board_id" UUID NOT NULL,
    "title" VARCHAR(255),
    "url" VARCHAR(100),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6),
    "deletedat" TIMESTAMP(6),
    "board_is_active" BOOLEAN NOT NULL,
    "user_id" UUID,
    "workspace_id" UUID,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("board_id")
);

-- CreateTable
CREATE TABLE "Lists" (
    "list_id" UUID NOT NULL,
    "title" VARCHAR(200),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6),
    "deletedat" TIMESTAMP(6),
    "list_is_active" BOOLEAN,
    "user_id" UUID,
    "board_id" UUID,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("list_id")
);

-- CreateTable
CREATE TABLE "Members_boards" (
    "member_board_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(6),
    "user_id" UUID,
    "board_id" UUID,

    CONSTRAINT "Members_boards_pkey" PRIMARY KEY ("member_board_id")
);

-- CreateTable
CREATE TABLE "Members_boards_permissions" (
    "member_board_permission_id" UUID NOT NULL,
    "member_board_id" UUID,
    "permission_id" UUID,

    CONSTRAINT "Members_boards_permissions_pkey" PRIMARY KEY ("member_board_permission_id")
);

-- CreateTable
CREATE TABLE "Members_tasks" (
    "member_task_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(6),
    "user_id" UUID,
    "task_id" UUID,

    CONSTRAINT "Members_tasks_pkey" PRIMARY KEY ("member_task_id")
);

-- CreateTable
CREATE TABLE "Members_tasks_permissions" (
    "member_task_permission_id" UUID NOT NULL,
    "member_task_id" UUID,
    "permission_id" UUID,

    CONSTRAINT "Members_tasks_permissions_pkey" PRIMARY KEY ("member_task_permission_id")
);

-- CreateTable
CREATE TABLE "Members_workspaces" (
    "member_workspace_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(6),
    "user_id" UUID,
    "workspace_id" UUID,

    CONSTRAINT "Members_workspaces_pkey" PRIMARY KEY ("member_workspace_id")
);

-- CreateTable
CREATE TABLE "Members_workspaces_permissions" (
    "member_workspace_permission_id" UUID NOT NULL,
    "member_workspace_id" UUID,
    "permission_id" UUID,

    CONSTRAINT "Members_workspaces_permissions_pkey" PRIMARY KEY ("member_workspace_permission_id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "permission_id" UUID NOT NULL,
    "name" VARCHAR(20) DEFAULT 'reader',
    "description" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(6),
    "permission_is_active" BOOLEAN,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "task_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" JSON,
    "category" VARCHAR(20),
    "url" VARCHAR(100) NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6),
    "deletedat" TIMESTAMP(6),
    "task_is_active" BOOLEAN NOT NULL,
    "user_id" UUID,
    "list_id" UUID,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "image_file" VARCHAR(255),
    "identifier" VARCHAR(255),
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "user_is_active" BOOLEAN NOT NULL,
    "user_payment_id" VARCHAR(20),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Users_permissions" (
    "users_permission_id" UUID NOT NULL,
    "user_id" UUID,
    "permission_id" UUID,

    CONSTRAINT "Users_permissions_pkey" PRIMARY KEY ("users_permission_id")
);

-- CreateTable
CREATE TABLE "Workspaces" (
    "workspace_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "tag" VARCHAR(100),
    "description" VARCHAR(255),
    "workspaces_type" VARCHAR(200),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6),
    "deletedat" TIMESTAMP(6),
    "workspace_is_active" BOOLEAN NOT NULL,
    "user_id" UUID,

    CONSTRAINT "Workspaces_pkey" PRIMARY KEY ("workspace_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boards_url_key" ON "Boards"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_url_key" ON "Tasks"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspaces"("workspace_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lists" ADD CONSTRAINT "Lists_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lists" ADD CONSTRAINT "Lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_boards" ADD CONSTRAINT "Members_boards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_boards" ADD CONSTRAINT "Members_boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_boards_permissions" ADD CONSTRAINT "Members_boards_permissions_member_board_id_fkey" FOREIGN KEY ("member_board_id") REFERENCES "Members_boards"("member_board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_boards_permissions" ADD CONSTRAINT "Members_boards_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_tasks" ADD CONSTRAINT "Members_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_tasks" ADD CONSTRAINT "Members_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_tasks_permissions" ADD CONSTRAINT "Members_tasks_permissions_member_task_id_fkey" FOREIGN KEY ("member_task_id") REFERENCES "Members_tasks"("member_task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_tasks_permissions" ADD CONSTRAINT "Members_tasks_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_workspaces" ADD CONSTRAINT "Members_workspaces_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_workspaces" ADD CONSTRAINT "Members_workspaces_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspaces"("workspace_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_workspaces_permissions" ADD CONSTRAINT "Members_workspaces_permissions_member_workspace_id_fkey" FOREIGN KEY ("member_workspace_id") REFERENCES "Members_workspaces"("member_workspace_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members_workspaces_permissions" ADD CONSTRAINT "Members_workspaces_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "Lists"("list_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_permissions" ADD CONSTRAINT "Users_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_permissions" ADD CONSTRAINT "Users_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspaces" ADD CONSTRAINT "Workspaces_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

