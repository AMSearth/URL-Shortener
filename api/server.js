import express from 'express';

const server = express();
const PORT = 3000;

let urls = {};

server.listen(PORT, ()=>{
	console.log(`Server running on port ${PORT}`);
});
