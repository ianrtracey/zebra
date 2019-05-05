const routes = require("next-routes");
const routesImplementation = routes();

// routesImplementation
//   .add([identifier], pattern = /identifier, page = identifier)
//   .add('/blog/:slug', 'blogShow')
//   .add('showBlogPostRoute', '/blog/:slug', 'blogShow')

routesImplementation.add("/:slug", "index");
routesImplementation.add("/more/:slug", "index");
routesImplementation.add("/event/new", "newEvent");
routesImplementation.add("/event/:id", "event");

module.exports = routesImplementation;

// Usage inside Page.getInitialProps (req = { pathname, asPath, query } = { pathname: '/', asPath: '/about', query: { slug: 'about' } })
