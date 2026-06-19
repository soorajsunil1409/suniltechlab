npm install

npx prisma generate

If schema changed: 
	npx prisma migrate dev --name add_snapshot_table
Else: 
	npx prisma migrate deploy

npm run build

