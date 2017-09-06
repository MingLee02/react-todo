API_DIR = api
WEB_DIR = web

help:
	@echo "Usage:"
	@echo "make help                -- display this help"
	@echo "make install             -- install dependencies of the app"

install:
	$(MAKE) -C $(WEB_DIR) install
	npm install
	if [ `psql -t -c "SELECT COUNT(1) FROM pg_catalog.pg_database WHERE datname = 'todo'"` -eq 0 ]; then \
		psql  -c "CREATE DATABASE todo"; \
	fi
	sequelize db:migrate


