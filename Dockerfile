FROM node:21-alpine AS react-builder
ENV NODE_ENV development
ENV VITE_HUB_ADDRESS /hub

WORKDIR /app
COPY client/package.json .
COPY client/package-lock.json .
RUN npm ci
COPY client/ .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-builder
WORKDIR /source
COPY server/ .

WORKDIR /source
RUN dotnet restore
RUN dotnet publish -c Release -o "/executable" --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=dotnet-builder /executable .
COPY --from=react-builder /app/dist wwwroot/

ENTRYPOINT ["dotnet", "server.dll"]
