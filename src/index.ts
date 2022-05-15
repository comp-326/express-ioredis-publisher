import express from 'express';
import RedisClient from './redis';

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/', (req, res) => {
	const publisher = RedisClient;
	publisher.publish(
		'users',
		JSON.stringify({
			id: new Date().getTime(),
			name: 'Jane Doe',
			gender: 'undefined',
		})
	);
	return res.status(200).json({ message: 'Redis published successfully' });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
