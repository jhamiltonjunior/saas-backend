"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const postgresHelper_1 = require("../helpers/postgresHelper");
class PostgresUserRepository {
    constructor(connectionObject) {
        this.postgresHelper = new postgresHelper_1.PostgresHelper(connectionObject);
    }
    async findUserById(id) {
        const result = await this.postgresHelper.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    }
    async getPermission(id) {
        const usersPermissions = await this.postgresHelper.reader(`
        SELECT *
        FROM users_permissions
        WHERE user_id = $1`, [id]);
        const permissionsId = [];
        usersPermissions.rows.forEach((column) => {
            permissionsId.push(column.permissions_id);
        });
        const permissionsNameToArrays = permissionsId.map(async (id) => {
            const permissions = await this.postgresHelper.reader(`
          SELECT *
          FROM permissions
          WHERE permissions_id = $1`, [id]);
            return permissions.rows[0].name;
        });
        let permissionsName = '';
        for (const value of permissionsNameToArrays) {
            permissionsName += `${(await value).toString()} `;
        }
        return permissionsName.trim();
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
