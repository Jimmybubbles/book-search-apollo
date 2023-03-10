const express = require('express');
// import apollo server
const { ApolloServer } = require("apollo-server-express");
const path = require('path');

// import typedefs and resolvers
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

// const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// apollo server instantiate 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});



// middleware parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
//===========================================================================//

// create a new instance of an Apollo server with graphql schema async
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
}

// call the async function to start the server
startApolloServer(typeDefs, resolvers);
