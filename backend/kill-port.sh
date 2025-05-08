#!/bin/bash
# This script kills the process running on port 5000 on macOS or Linux
PORT=5000
echo "Killing process on port $PORT..."
lsof -ti tcp:$PORT | xargs kill -9
echo "Port $PORT is now free."
