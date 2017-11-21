<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://spider.dcloud.net.cn/api/news');
//参数为1表示传输数据，为0表示直接输出显示。
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//参数为0表示不带头文件，为1表示带头文件
curl_setopt($ch, CURLOPT_HEADER, 0);
$output = curl_exec($ch);
curl_close($ch);
echo $output;
?>