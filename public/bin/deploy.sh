# 将 @@APP_HOME@@ 替换成您的应用名
# 上下线的概念见 https://help.aliyun.com/document_detail/57399.html
#!/bin/bash

PROG_NAME=$0
ACTION=$1
ONLINE_OFFLINE_WAIT_TIME=6  # 实例上下线的等待时间
APP_START_TIMEOUT=50     # 等待应用启动的时间
APP_PORT=8080          # 应用端口
HEALTH_CHECK_URL=http://127.0.0.1:${APP_PORT}/  # 应用健康检查URL
HEALTH_CHECK_FILE_DIR=/home/app/status   # 脚本会在这个目录下生成nginx-status文件
APP_HOME=/home/app  # 从package.tgz中解压出来的jar包放到这个目录下
APP_LOG=${APP_HOME}/logs/app.log # 应用的日志文件

# 创建出相关目录
mkdir -p ${HEALTH_CHECK_FILE_DIR}
mkdir -p ${APP_HOME}
mkdir -p ${APP_HOME}/logs

usage() {
    echo "Usage: $PROG_NAME {start|stop|online|offline|restart}"
    exit 2
}
online() {
    # 挂回SLB
    touch -m $HEALTH_CHECK_FILE_DIR/nginx-status || exit 1
    echo "wait app online in ${ONLINE_OFFLINE_WAIT_TIME} seconds..."
    sleep ${ONLINE_OFFLINE_WAIT_TIME}
}
offline() {
    # 摘除SLB
    rm -f $HEALTH_CHECK_FILE_DIR/nginx-status || exit 1
    echo "wait app offline in ${ONLINE_OFFLINE_WAIT_TIME} seconds..."
    sleep ${ONLINE_OFFLINE_WAIT_TIME}
}
health_check() {
    exptime=0
    echo "checking ${HEALTH_CHECK_URL}"
    while true
    do
        status_code=`/usr/bin/curl -L -o /dev/null --connect-timeout 5 -s -w %{http_code}  ${HEALTH_CHECK_URL}`
        if [ x$status_code != x200 ];then
            sleep 1
            ((exptime++))
            echo -n -e "\rWait app to pass health check: $exptime..."
        else
            break
        fi
        if [ $exptime -gt ${APP_START_TIMEOUT} ]; then
            echo
            echo 'app start failed'
            exit 1
        fi
    done
    echo "check ${HEALTH_CHECK_URL} success"
}
# 端口占用检查
checkPort(){
	lsof -i :$1
	if [ $? == 0 ]; then
		echo "服务端口$1被占用,程序退出!"
	fi
}
install_nginx() {
  yum -y install lsof
  # checkPort ${APP_PORT}
  NGINX_VERSION=nginx-1.15.9
  # NGINX安装包下载地址
  F_NGINX_PKG="http://nginx.org/download/${NGINX_VERSION}.tar.gz"
  # nginx安装路径
  D_NGINX_SERVICE="/user/share/nginx"
  NG_Tmp=/tmp/downloads
  # nginx进程用户属性
  V_NGINX_USER="nginx"

  [ -d ${D_NGINX_SERVICE} ] || mkdir -p ${D_NGINX_SERVICE}
  [ -d ${D_NGINX_LOG} ] || mkdir -p ${D_NGINX_LOG}

	local v_nginx_flag=$(nginx -v 2>&1 | awk 'NR==1{print substr($0,0,5)}')
	if [[ "${v_nginx_flag}" == "nginx" ]]; then
		echo "nginx installed, remove it!"
		pkill nginx
	  rm -rf ${D_NGINX_SERVICE} && echo "Nginx卸载完成"
	else
		echo "[INFO] Nginx not installed, begin to install Nginx!"
	fi
  # 开始安装nginx

  # 安装nginx服务所需库
	yum -y install pcre pcre-devel openssl openssl-devel gcc-c++

	# 创建临时下载文件目录并进入
	mkdir -p ${NG_Tmp} && cd ${NG_Tmp}

	wget -q ${F_NGINX_PKG}

	# 创建nginx运行用户
	id ${V_NGINX_USER} &>/dev/null || useradd ${V_NGINX_USER} -s /sbin/nologin -M

  tar -xf ${NGINX_VERSION}.tar.gz
  cd ${NGINX_VERSION}

  # 编译nginx服务并安装
	./configure --user=${V_NGINX_USER} --group=${V_NGINX_USER} --prefix=${D_NGINX_SERVICE} --with-http_stub_status_module --with-http_ssl_module
	make && make install

  if [ $? != 0 ]; then
		echo "Nginx服务编译安装失败,程序退出!"
		exit 1
	fi
	# 启动nginx
	${D_NGINX_SERVICE}/sbin/nginx -c ${APP_HOME}/bin/conf/nginx.conf

  rm -rf ${NG_Tmp}/nginx*
}
start_application() {
    echo 'start application'
    chmod 777 ${APP_HOME}
    #nohup npm start  > nohup.out 2>&1 &
}
stop_application() {
    echo 'stop the nodejs process'

    PID=`ps ax | grep 'node' | grep 'bin/server.js' | awk '{print $1}'`
    echo ${PID}
    if [[ ! -z "$PID" ]]; then
    kill -15 $PID
    else
     echo 'can not find the process id for nodejs'
    fi
}
start() {
    echo 'app start deploy ... ...'
    install_nginx
#    sh ${APP_HOME}/bin/install_nginx.sh
    start_application
    # online
    # health_check
}
stop() {
    offline
    stop_application
}
case "$ACTION" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    online)
        online
    ;;
    offline)
        offline
    ;;
    restart)
        stop
        start
    ;;
    *)
        usage
    ;;
esac
