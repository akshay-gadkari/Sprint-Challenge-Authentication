const { server } = require('./server.js');

server.get('/', (req, res) => {
    res.send('Its Alive!');
});

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
