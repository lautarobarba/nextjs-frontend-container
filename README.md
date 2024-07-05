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
