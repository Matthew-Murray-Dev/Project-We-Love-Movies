/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//updated table column name
exports.up = function(knex) {
    return knex.schema.table("reviews", (table) => {
        table.renameColumn("context", "content");
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("reviews", (table) => {
        table.renameColumn("content", "context");
        
      });
};
