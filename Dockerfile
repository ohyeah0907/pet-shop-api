FROM node:14.15.4

LABEL "maintainer"="mobieyes_v2"

# RUN ["yarn", "run dev"]

COPY script.sh /script.sh

CMD ["/script.sh"]