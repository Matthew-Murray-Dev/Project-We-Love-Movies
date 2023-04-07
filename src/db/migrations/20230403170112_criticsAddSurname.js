/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Added missing column
exports.up = function(knex) {
    return knex.schema.table("critics", (table) => {
        
        table.text("surname",null);
         })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("critics", (table) => {
    table.dropColumn("surname");
});
};
