# Sử dụng image node với phiên bản mong muốn
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/api

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./
#COPY .env* ./

# Cài đặt các dependencies
RUN npm install -g yarn --force

# Sao chép mã nguồn ứng dụng vào thư mục làm việc
#COPY . .

# Mở cổng mà ứng dụng sẽ lắng nghe
EXPOSE 4002

# Khởi chạy ứng dụng
CMD [ "npm", "start" ]