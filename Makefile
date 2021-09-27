install:
	npm i
dev:
	npm run dev
prod:
	npm i
	npm i -g pm2
	npm run build
	npm run start