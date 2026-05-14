# Complete Example

Monorepo con Turborepo, Bun, Next.js y Elysia.

## Stack

- **Frontend web:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, TanStack Query, better-auth
- **App móvil:** Expo (React Native) con Expo Router, TanStack Query, better-auth
- **Backend:** Elysia (Bun), Prisma + SQLite, better-auth
- **Paquetes compartidos:** `@repo/shared` (Eden client, Zod), `@repo/domain` (entidades)
- **Tooling:** Biome, Turborepo, Bun

## Requisitos

- [Bun](https://bun.sh) >= 1.3.0

## Primeros pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd complete-example

# 2. Instalar dependencias (desde la raíz)
bun install

# 3. Configurar variables de entorno
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
# Editar los .env si es necesario

# 4. Inicializar la base de datos (generar Prisma client + push schema)
bun run --cwd apps/backend db:reset

# 5. Iniciar backend + frontend web
bun run dev
```

- **Frontend web:** http://localhost:3000
- **Backend:** http://localhost:8000

## App móvil

La app móvil se conecta al backend a través de la red local. Necesitas configurar tu IP local.

### Obtener tu IP local

```bash
# Windows
ipconfig | findstr /i "IPv4"

# macOS
ipconfig getifaddr en0

# Linux
hostname -I
```

### Configurar `.env` de mobile

Edita `apps/mobile/.env`:

```env
EXPO_PUBLIC_BACKEND_URL="http://<TU_IP_LOCAL>:8000"
EXPO_PUBLIC_LOCAL_BACKEND_PORT=8000
```

### Iniciar la app móvil

Asegúrate de que el backend esté corriendo (`bun run dev`), luego en otra terminal:

```bash
bun run --cwd apps/mobile start
```

Esto abre el menú de Expo. Escanea el QR con Expo Go o presiona `a` para Android emulator / `i` para iOS simulator.

### Scripts de mobile

| Comando | Descripción |
|---|---|
| `bun run --cwd apps/mobile start` | Inicia Expo dev server |
| `bun run --cwd apps/mobile android` | Compila y corre en Android |
| `bun run --cwd apps/mobile ios` | Compila y corre en iOS |
| `bun run --cwd apps/mobile web` | Inicia versión web de la app |

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `bun run dev` | Inicia frontend web y backend en dev |
| `bun run build` | Build de todos los paquetes |
| `bun run check` | Ejecuta checks con Ultracite |
| `bun run fix` | Auto-fixa errores con Ultracite |
| `bun run --cwd apps/backend db:reset` | Resetea la base de datos |

## Estructura

```
complete-example/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── backend/      # Elysia API
│   └── mobile/       # Expo (React Native)
├── packages/
│   ├── shared/       # @repo/shared
│   └── domain/       # @repo/domain
├── turbo.json
├── bunfig.toml
└── package.json
```
