FROM nginx

MAINTAINER gamoradf-dev-team <yongpeng.wong@gmail.com>

RUN rm /etc/nginx/conf.d/default.conf
COPY ./bin/conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ /usr/share/nginx/html

# 添加nginx用户
# RUN  groupadd -r nginx && useradd -r -g nginx -s /bin/false -M nginx

CMD ["nginx", "-g", "daemon off;"]