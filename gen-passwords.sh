#!/bin/bash

# Función para generar una contraseña aleatoria de 32 caracteres hexadecimales
generatePassword() {
    openssl rand -hex 16
}

# Función para generar una clave JWT válida sin jq
generateJWT() {
    local role="$1"
    local secret=$(openssl rand -hex 32)  # Clave secreta aleatoria de 64 caracteres hexadecimales

    local header='{"alg":"HS256","typ":"JWT"}'
    local payload="{\"role\":\"$role\",\"iss\":\"supabase-demo\",\"iat\":$(date +%s),\"exp\":$(( $(date +%s) + 500000000 ))}"

    local header_base64=$(echo -n "$header" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')
    local payload_base64=$(echo -n "$payload" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')

    local signature=$(echo -n "$header_base64.$payload_base64" | openssl dgst -sha256 -hmac "$secret" -binary | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')

    echo "$header_base64.$payload_base64.$signature"
}

# Rutas de los archivos
ENV_FILE="supabase/docker/.env"
DOCKER_COMPOSE_FILE="website/docker/docker-compose.yml"
MOODLE_COMPOSE_FILE="moodle/docker-compose.yml"

# Verificar si los archivos existen
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: El archivo $ENV_FILE no existe."
    exit 1
fi

if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
    echo "Error: El archivo $DOCKER_COMPOSE_FILE no existe."
    exit 1
fi

if [ ! -f "$MOODLE_COMPOSE_FILE" ]; then
    echo "Error: El archivo $MOODLE_COMPOSE_FILE no existe."
    exit 1
fi

# Generar nuevas contraseñas
NEW_POSTGRES_PASSWORD=$(generatePassword)
NEW_JWT_SECRET=$(generatePassword)
NEW_DASHBOARD_PASSWORD=$(generatePassword)
NEW_SECRET_KEY_BASE=$(generatePassword)
NEW_VAULT_ENC_KEY=$(generatePassword)
NEW_ANON_KEY=$(generateJWT "anon")
NEW_SERVICE_ROLE_KEY=$(generateJWT "service_role")
NEW_MOODLE_DB_PASSWORD=$(generatePassword)
NEW_MOODLE_PASSWORD=$(generatePassword)

# Reemplazar contraseñas en el archivo .env
sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$NEW_POSTGRES_PASSWORD|" "$ENV_FILE"
sed -i "s|JWT_SECRET=.*|JWT_SECRET=$NEW_JWT_SECRET|" "$ENV_FILE"
sed -i "s|DASHBOARD_PASSWORD=.*|DASHBOARD_PASSWORD=$NEW_DASHBOARD_PASSWORD|" "$ENV_FILE"
sed -i "s|SECRET_KEY_BASE=.*|SECRET_KEY_BASE=$NEW_SECRET_KEY_BASE|" "$ENV_FILE"
sed -i "s|VAULT_ENC_KEY=.*|VAULT_ENC_KEY=$NEW_VAULT_ENC_KEY|" "$ENV_FILE"
sed -i "s|ANON_KEY=.*|ANON_KEY=$NEW_ANON_KEY|" "$ENV_FILE"
sed -i "s|SERVICE_ROLE_KEY=.*|SERVICE_ROLE_KEY=$NEW_SERVICE_ROLE_KEY|" "$ENV_FILE"

# Reemplazar ANON_KEY en docker-compose.yml
sed -i "s|REACT_APP_SUPABASE_ANON_KEY=.*|REACT_APP_SUPABASE_ANON_KEY=$NEW_ANON_KEY|" "$DOCKER_COMPOSE_FILE"

# Reemplazar contraseñas en moodle/docker-compose.yml
sed -i "s|MOODLE_DATABASE_PASSWORD=.*|MOODLE_DATABASE_PASSWORD=$NEW_MOODLE_DB_PASSWORD|" "$MOODLE_COMPOSE_FILE"
sed -i "s|MARIADB_PASSWORD=.*|MARIADB_PASSWORD=$NEW_MOODLE_DB_PASSWORD|" "$MOODLE_COMPOSE_FILE"
sed -i "s|MOODLE_PASSWORD=.*|MOODLE_PASSWORD=$NEW_MOODLE_PASSWORD|" "$MOODLE_COMPOSE_FILE"

echo "Contraseñas y claves JWT actualizadas en $ENV_FILE"
echo "ANON_KEY actualizado en $DOCKER_COMPOSE_FILE"
echo "MOODLE_DATABASE_PASSWORD, MARIADB_PASSWORD y MOODLE_PASSWORD actualizados en $MOODLE_COMPOSE_FILE"