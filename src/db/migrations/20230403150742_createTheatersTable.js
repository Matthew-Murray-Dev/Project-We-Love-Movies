/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary();
        table.text("name", null);
        table.text("address_line_1", null);
        table.text("address_line_2",null);
        table.text("city",null);
        table.text("state", null);
        table.text("zip", null);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};