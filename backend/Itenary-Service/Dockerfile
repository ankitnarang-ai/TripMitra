# ================================
# Stage 1: Builder (for prod build)
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and prisma schema
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install all deps (dev + prod)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY src ./src

# Build TypeScript -> JavaScript
RUN npm run build


# ================================
# Stage 2: Production
# ================================
FROM node:20-alpine AS production
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev && npm cache clean --force

# Copy prisma schema (needed for migrate deploy in prod)
COPY prisma ./prisma

# Copy built code + node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3002
USER node

# Run migrations then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node --enable-source-maps dist/index.js"]


# ================================
# Stage 3: Development
# ================================
FROM node:20-alpine AS development
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install all deps
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy source
COPY src ./src

EXPOSE 3002

CMD ["npm", "run", "dev"]
