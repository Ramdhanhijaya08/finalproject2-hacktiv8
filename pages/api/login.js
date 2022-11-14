import axios from 'axios';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/env';

export default async function handler(req, res) {
	if (req.method !== 'POST') res.status(405).send({ message: 'Only POST requests allowed' });

	const { data: users } = await axios('https://fakestoreapi.com/users');

	const { email, password } = req.body;

	if (!email || !password) res.status(401).send({ message: 'Email and password field is required' });

	const findUser = users.find(user => user.email === email);

	if (findUser) {
		if (findUser.password === password) {
			const token = jwt.sign({ ...findUser }, JWT_SECRET, { expiresIn: '7d' });

			res.status(200);
			res.json({
				message: 'Login successed',
				data: { user: findUser, token: token },
			});
		} else {
			res.status(401).send({ message: 'Incorrect email or password' });
		}
	} else {
		if (!findUser) res.status(401).send({ message: 'Incorrect email or password' });
	}
}
