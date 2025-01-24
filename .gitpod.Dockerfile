FROM gitpod/workspace-full:latest

# Switch to root to install system dependencies
USER root

# Install required system libraries for Playwright
RUN apt-get update && apt-get install -y \
    libx11-xcb-dev \
    libfontconfig1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libxrandr2 \
    libxshmfence1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Switch back to Gitpod user
USER gitpod

# Install Node.js dependencies, including Playwright
RUN npx playwright install && npx playwright install --with-deps && npm install -g node-ovsx-sign

