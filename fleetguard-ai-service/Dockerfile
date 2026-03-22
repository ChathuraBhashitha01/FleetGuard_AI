FROM python:3.11-slim

# Install system libraries needed by OpenCV and Ultralytics
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxrender-dev \
    libxext6 \
    libxcb1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements FIRST to leverage Docker layer caching
COPY requirements.txt .

# Install dependencies (will now compile cleanly)
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything else
COPY . .

# Expose the Railway default port
EXPOSE 8080

# Command to run the application
CMD ["python", "app.py"]
