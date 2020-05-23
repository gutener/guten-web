#!/bin/bash

# 基本参数设定
LANG=en
ROOT_UID=0
NGUser=nginx
NGVER=1.12.1
NGINX_VERSION=nginx-1.15.9
# NGINX安装包下载地址
F_NGINX_PKG="http://nginx.org/download/${NGINX_VERSION}.tar.gz"
NGRunDir=/application/nginx-$NGVER
NGTmp=/tmp/downloads
NGDownAddr=http://west.724001.com/abc/linuxweb/nginx/

# 脚本需要root用户权限来运行,因此,对当前用户进行判断,对不符合要求的用户给出友好提示,并终止程序运行
if [ "$UID" -ne "$ROOT_UID" ];  then
	EchoRed "Must be root to run this script."
	exit 1
fi

# 检查文件是否存在,不存在则下载
function FileNotFoundWget(){
	if [ ! -f $1 ];then
		wget -q $NGDownAddr/$1
	fi
}

# 端口占用检查
function CheckPort(){
	lsof -i :$1
	if [ $? == 0 ]; then
		EchoRed "服务端口$1被占用,程序退出!"
		exit 1
	fi
}

# 安装nginx服务
function InstallNginx(){
	CheckPort 80
	yum -y install wget lsof
	# 安装nginx服务所需库
	yum -y install pcre pcre-devel openssl openssl-devel gcc-c++
	# 开始安装nginx
	# 创建临时下载文件目录并进入
	mkdir -p $NGTmp && cd $NGTmp
	# 下载nginx安装包
	FileNotFoundWget nginx-$NGVER.tar.gz
	# 创建nginx运行用户
	id $NGUser &>/dev/null || useradd $NGUser -s /sbin/nologin -M
	# 解压nginx安装包并进入解压后的目录
	tar xf nginx-$NGVER.tar.gz
	cd nginx-$NGVER
	# 编译nginx服务并安装
	./configure --user=$NGUser --group=$NGUser --prefix=$NGRunDir --with-http_stub_status_module --with-http_ssl_module
	make && make install
	if [ $? != 0 ]; then
		EchoRed "Nginx服务编译安装失败,程序退出!"
		exit 1
	fi
	EchoGreen "Nginx服务编译安装成功!"
	EchoYellow "温馨提示:卸载Nginx访问可使用./$0 remove 或者sh $0 remove"
	# 成功安装后清理下载解压的nginx文件
	rm -rf $NGTmp/nginx*
}

# 启动并检查nginx服务状态
function NginxStatus(){
	# 启动nginx
	$NGRunDir/sbin/nginx
	$NGRunDir/sbin/nginx -s reload
	$NGRunDir/sbin/nginx -s stop
	$NGRunDir/sbin/nginx -t
	$NGRunDir/sbin/nginx
	EchoYellow "温馨提示:Nginx使用命令:"
	EchoYellow "$NGRunDir/sbin/nginx"
	EchoYellow "$NGRunDir/sbin/nginx -s reload"
	EchoYellow "$NGRunDir/sbin/nginx -s stop"
	EchoYellow "$NGRunDir/sbin/nginx -t"
	# 查看nginx服务启动情况
	netstat -tunlp | grep nginx
	ps -ef | grep nginx
	curl -I localhost
}

# 卸载nginx服务
function RemoveNginx(){
	pkill nginx
	rm -rf $NGRunDir && EchoGreen "Nginx卸载完成"
}

# 判断脚本是否传参数,并根据参照进行判断执行
if [ $# == 0 ]; then
	InstallNginx
	NginxStatus
	exit 0
elif [ $1 == remove ]; then
	RemoveNginx
	exit 0
fi
RemoveNginx
InstallNginx
NginxStatus
