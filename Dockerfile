# install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# build app
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# WE HAVE TO DECLARE THESE ARGUMENTS FOR AUTH0 TO WORK PROPERLY!!
ARG NEXT_PUBLIC_AUTH0_DOMAIN
ARG NEXT_PUBLIC_AUTH0_CLIENT_ID
RUN npm run build

# production image created
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# copied built assets from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"] 