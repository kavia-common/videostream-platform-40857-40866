#!/bin/bash
cd /home/kavia/workspace/code-generation/videostream-platform-40857-40866/youtube_clone_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

