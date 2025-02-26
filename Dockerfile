# Root Dockerfile

# Build Maven project
FROM maven:3.8.5-openjdk-17-slim AS build

WORKDIR /app

# Copy the entire project (adjust path for correct folder structure)
COPY . .

# Run mvn clean install (adjust the path to pom.xml based on the structure)
RUN mvn clean install -DskipTests -f task-service-backend/task-service-backend/pom.xml

# Use the build artifact to run the backend service
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the jar built from the Maven build stage
COPY --from=build /app/task-service-backend/task-service-backend/target/task-service-backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
