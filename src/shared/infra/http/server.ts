import { app } from './app';

app.listen(3333, () => {
  console.log('Server started at port 3333. ');
  console.log('Server documentation on http://localhost:3333/api-docs');
});
