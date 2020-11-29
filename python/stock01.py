import requests

url = 'http://www.zsxg.cn/api/v2/index/list'
headers = {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN,zh;q=0.9', 'Connection': 'keep-alive', 'content-type': 'application/json;charset=utf-8', 'Host': 'www.zsxg.cn', 'Referer': 'http://www.zsxg.cn/market', 'requestFrom': 'pc', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'}
params = {'type': '1'}

res = requests.get(url,headers = headers,params = params)
res_js = res.json()
index_list = res_js['datas']

for index in index_list:
    name = index['name']
    pe = index['pe']
    pb = index['pb']
    print(name+':'+str(pe)+','+str(pb))
    print('---------')






