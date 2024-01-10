## Enable uuid-ossp on postgres
- ```docker exec -it <container_name_or_id> psql -U <username> -d <database_name>```
- ```SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';```
- ```CREATE EXTENSION IF NOT EXISTS "uuid-ossp";```