# NextJS Frontend Container

## Configuración

```bash
$ cp .env.example .env
$ nano .env
```

## Iniciar

```bash
$ docker compose up -d
```

_Quitando la opción *-d* se ven los logs del contenedor._

## Produccion (manual)

1. Login al registry:

```bash
$ docker login registry.desarrollosur.com.ar
```

2. Build:

```bash
$ docker build -f Dockerfile -t registry.desarrollosur.com.ar/lautarobarba/next_template:latest .
```

3. Push:

```bash
$ docker push registry.desarrollosur.com.ar/lautarobarba/next_template:latest
```

4. Deploy (Next.js SSR escucha en 3000 dentro del contenedor; `FRONT_PORT` se mapea a 3000):

```bash
$ FRONT_PORT=XXXX docker compose -f docker-compose.production.yml up -d
```

Para ver el estado del healthcheck:

```bash
$ docker inspect --format='{{json .State.Health}}' next_template
```

## Detener

```bash
$ # Si estan corriendo con logs visibles
$ #     detener con Ctr+C
$ docker compose down
```

## Agregar librerias

```bash
$ # Si estan corriendo con logs visibles
$ #     detener con Ctr+C
$ docker compose exec next_template npm install --save NPM_PACKAGE
```

## Debug

```bash
$ docker compose exec -it next_template bash
```
