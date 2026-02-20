all:
	@echo "Airflow Data Quality Duel"

.PHONY: run
run:
	python3 -m http.server 8000

.PHONY: bust
bust:
	@TS=$$(date +%s); \
	echo "Busting cache with v=$$TS"; \
	sed -i '' -E "s/(style\.css|game\.js)(\?v=[0-9]+)?/\1?v=$$TS/g" index.html
