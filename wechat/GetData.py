import jqdatasdk
import pandas
from jqdatasdk import income
from jqdatasdk import cash_flow, query
import requests, json
import sys
import pandas as pd

if sys.version_info[0] < 3:
    import io

    iost = io.StringIO()
else:
    from io import StringIO
url = "https://dataapi.joinquant.com/apis"

jqdatasdk.auth('18806662076', 'WANGfei123')
myq = query(jqdatasdk.valuation).filter(jqdatasdk.valuation.code == '000001.XSHE')
df = jqdatasdk.get_fundamentals(myq, '2018-4-12')

print("当日动态市盈率是：", df['pe_ratio'])
print('当日市净率是：', df['pb_ratio'])
print('当日换手率是：', df['turnover_ratio'])
print('当日市销率是：', df['ps_ratio'])


def get_token():
    body = {
        "method": "get_token",
        "mob": "18806662076",  # mob是申请JQData时所填写的手机号
        "pwd": "WANGfei123",  # Password为聚宽官网登录密码，新申请用户默认为手机号后6位
    }
    return requests.post(url, data=json.dumps(body)).text


def get_data(response):  # 数据处理函数,处理csv字符串函数
    '''格式化数据为DataFrame'''
    return pd.read_csv(StringIO(response.text))


token = get_token()


def http_get_security_info(code):
    body = {
        "method": "get_security_info",
        "token": token,
        "code": code
    }
    return get_data(requests.post(url, data=json.dumps(body)))


def get_current_price(code):
    body = {
        "method": "get_current_price",
        "token": token,
        "code": code
    }
    return get_data(requests.post(url, data=json.dumps(body)))


def http_get_fundamentals(table, code, count=None, date=None, columns=None):
    body = {
        "method": "get_fundamentals",
        "token": token,
        "table": table,
        "columns": columns,
        "code": code,
        "date": date,
        "count": count,
        "pe_ratio": None,
    }
    return get_data(requests.post(url, data=json.dumps(body)))


http_get_fundamentals('income', code="000001.XSHE", count=5, date="2016-12-04",
                      columns="code,pubDate,day,statDate,commission_income")
