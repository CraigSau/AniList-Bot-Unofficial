const express = require ('express');

const app = express();

app.get('/', (request, response) => {
  return response.sendFile('index.html', { root: '.'});
});

app.listen(8080, () => console.log(`App listening at port 8080`));
