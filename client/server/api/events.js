const {
  routes: { createSqlRestRoutes }
} = require("sql-wizard");

module.exports = (server, pool) => {
  createSqlRestRoutes(server, pool, "/api/events", "events", {
    /* place custom REST handlers here */
  });
};
