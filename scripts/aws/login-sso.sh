#!/bin/bash

# Colors
GREEN='\e[32m[SUCCESS]:'
RED='\e[31m[ERROR]:'
NC='\e[0m' # No Color

if ! command -v aws >/dev/null 2>&1; then
  echo -e "${RED} AWS CLI no está instalado ${NC}"
  exit 1
fi

# Ruta al archivo .env
env_file=".env"

# Verificar si el usuario actual tiene permisos de lectura en el archivo .env
if ! [ -r "$env_file" ]; then
  echo -e "${RED} El archivo .env no existe ${NC}"
  exit 1
fi

# Leer las variables del archivo .env
echo "Leyendo variables desde $env_file ..."

declare -A env_vars

while IFS='=' read -r key value; do
  # Ignorar líneas vacías o comentarios
  if [ -n "$key" ] && [[ "$key" != \#* ]]; then
    # Eliminar comillas simples y dobles de los valores de las variables
    value=$(echo "$value" | sed "s/'//g; s/\"//g")

    # Agregar la variable al array asociativo
    env_vars["$key"]=$value
  fi
done < "$env_file"

# Validar que todas las variables necesarias estén presentes
required_vars=("AWS_REPOSITORY" "AWS_DOMAIN" "AWS_DOMAIN_OWNER" "AWS_REGION" "AWS_PROFILE")
missing_vars=()
for var in "${required_vars[@]}"; do
  if [ -z "${env_vars[$var]}" ]; then
    missing_vars+=("$var")
  fi
done

# Si faltan variables, mostrar un mensaje de error y salir del script
if [ ${#missing_vars[@]} -gt 0 ]; then
  echo -e "${RED} Faltan las siguientes variables en el archivo $env_file: ${NC}"
  for var in "${missing_vars[@]}"; do
    echo "- $var"
  done
  exit 1
fi

# Concatenar variables al comando y ejecutarlo
command_aws="aws sso login --profile ${env_vars["AWS_PROFILE"]}"

echo "Comando a ejecutar: $command_aws"
echo "Ejecutando comando ..."

# Mostrar mensaje de loading
echo -n ""
while true; do
    echo -ne "/\r"
    sleep 0.1
    echo -ne "-\r"
    sleep 0.1
    echo -ne "\\r"
    sleep 0.1
    echo -ne "|\r"
    sleep 0.1
done &

# Execute the command, save the output and clean the output
result=$(eval "$command_aws" 2>&1)

# Print the output
result_code=$?

# Detener el mensaje de loading
kill $! >/dev/null 2>&1

# Verificar si el comando falló
if [ $result_code -ne 0 ]; then
  echo -e "${RED} Hubo un error al ejecutar el comando:${NC}"
  echo "$result" | sed "s/^/  /"
  exit 1
fi

echo -e "${GREEN} Comando ejecutado con éxito${NC}"
echo "$result"
exit 0
