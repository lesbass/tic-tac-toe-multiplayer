.PHONY: server client

server:
	cd server && dotnet run

client:
	cd client && npm i && npm start
