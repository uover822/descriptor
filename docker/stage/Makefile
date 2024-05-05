build :
	mkdir -p app/srv
	cp -r ../../../descriptor/descriptor.js app
	cp -r ../../../descriptor/srv/*.js app/srv
	docker build -t msr-descriptor:1 .
	docker build -t msr-descriptor-prod:1 -f Dockerfile-prod .

clean :
	rm *~

.PHONY : build clean
