FROM node:18-alpine3.15

# K-Fonts
RUN apk --update add fontconfig
RUN mkdir -p /usr/share/fonts/nanumfont
RUN wget http://cdn.naver.com/naver/NanumFont/fontfiles/NanumFont_TTF_ALL.zip
RUN unzip NanumFont_TTF_ALL.zip -d /usr/share/fonts/nanumfont
RUN fc-cache -f && rm -rf /var/cache/*

# bash install
RUN apk add bash

# Work Directory
WORKDIR /opt/cdec

# Copy
COPY . .

RUN ls

RUN npm install 

RUN npm install gulp -g

RUN gulp

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
