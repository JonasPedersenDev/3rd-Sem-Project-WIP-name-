FROM gradle:jdk17-alpine AS build

WORKDIR /app
COPY . .

RUN gradle bootJar --no-daemon

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/Himmerland-booking-software-0.0.1-SNAPSHOT.jar app.jar

COPY --from=build /app/src/main/resources src/main/resources


EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]