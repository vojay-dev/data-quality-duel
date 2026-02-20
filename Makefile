all:
	@echo "Airflow Data Quality Duel"

.PHONY: run
run:
	python3 -m http.server 8000
