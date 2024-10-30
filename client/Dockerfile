# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app/client

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application to the working directory
COPY . .

# Expose the port that Streamlit will run on
EXPOSE 8501

# Command to run the Streamlit application
CMD ["streamlit", "run", "Home.py", "--server.port=8501", "--server.address=0.0.0.0"]
