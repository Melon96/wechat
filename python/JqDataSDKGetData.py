import threading

import pandas as pd
import jqdatasdk
from jqdatasdk import cash_flow, query, indicator

jqdatasdk.auth('18806662076', 'WANGfei123')


def get_fundamental(code, Date):
    myq = query(jqdatasdk.valuation).filter(jqdatasdk.valuation.code == code)
    df = jqdatasdk.get_fundamentals(myq, Date)
    strGetPe = '%s ' % df['pe_ratio']
    strGetPb = '%s ' % df['pb_ratio']
    # PE返回字符串处理
    nEnd = strGetPe.index('N')
    strGetPe = strGetPe[1:nEnd]
    strPe = strGetPe.strip()
    # PB返回字符串处理
    nEnd = strGetPb.index('N')
    strGetPb = strGetPb[1:nEnd]
    strPb = strGetPb.strip()

    strPe = "当日市盈率(PE)是：" + strPe + ";  "
    strPb = "当日市净率(PB)是：" + strPb + ";  "
    strReturn = strPe + strPb
    return strReturn


def get_fundamentals_continuously(code, Date, Count):
    myq = query(jqdatasdk.valuation).filter(jqdatasdk.valuation.code == code)
    GL_df = jqdatasdk.get_fundamentals_continuously(myq, end_date=Date, count=Count, panel=False)
    return GL_df


def get_pe_percent(code, Date, Count):
    # df=GL_df
    df = get_fundamentals_continuously(code, Date, Count)
    framePe = pd.DataFrame(df['pe_ratio'])
    TodayPe = framePe[Count - 2:Count - 1]
    framePe.sort_values(by='pe_ratio', axis=0, ascending=True, inplace=True)

    strGetPe = '%s ' % TodayPe
    nEnd = len(strGetPe)
    strGetPe = strGetPe[nEnd - 10:nEnd]
    strPe = strGetPe.strip()
    print(TodayPe)
    print(strPe)
    print("排过序的pe：", framePe)
    nCount = 0
    fPe = float(strPe)
    for row in framePe.iterrows():
        if float(row[1]) <= fPe:
            nCount += 1
        else:
            break

    print(nCount)
    print(nCount / Count)
    nCount /= Count
    nCount *= 100
    # strReturnPePercent = '%s ' % nCount
    strReturnPePercent = "{:.2f}".format(nCount)
    strReturnPePercent = "当日市盈率(PE)百分位为:" + strReturnPePercent
    return strReturnPePercent


def get_stock_pe_and_pb(code, Date, Count):
    df = get_fundamentals_continuously(code, Date, Count)
    framePe = pd.DataFrame(df['pe_ratio'])
    TodayPe = framePe[Count - 2:Count - 1]
    framePe.sort_values(by='pe_ratio', axis=0, ascending=True, inplace=True)
    framePb = pd.DataFrame(df['pb_ratio'])
    TodayPb = framePb[Count - 2:Count - 1]
    framePb.sort_values(by='pb_ratio', axis=0, ascending=True, inplace=True)

    strGetPe = '%s ' % TodayPe
    nEnd = len(strGetPe)
    strGetPe = strGetPe[nEnd - 10:nEnd]
    strPe = strGetPe.strip()

    strGetPb = '%s ' % TodayPb
    nEnd = len(strGetPb)
    strGetPb = strGetPb[nEnd - 10:nEnd]
    strPb = strGetPb.strip()
    nCountPe = 0
    fPe = float(strPe)
    for row in framePe.iterrows():
        if float(row[1]) <= fPe:
            nCountPe += 1
        else:
            break
    nCountPe /= Count
    nCountPe *= 100
    # strReturnPePercent = '%s ' % nCount
    strPe = "当日市盈率(PE)是：" + strGetPe + ";  "
    strReturnPePercent = "{:.2f}".format(nCountPe)
    strReturnPePercent = "当日市盈率(PE)百分位为:" + strReturnPePercent + ";  "
    nCountPb = 0
    fPb = float(strPb)
    for row in framePb.iterrows():
        if float(row[1]) <= fPb:
            nCountPb += 1
        else:
            break
    nCountPb /= Count
    nCountPb *= 100
    strPb = "当日市净率(PB)是：" + strGetPb + ";  "
    strReturnPbPercent = "{:.2f}".format(nCountPb)
    strReturnPbPercent = "当日市净率(Pb)百分位为:" + strReturnPbPercent
    strReturnPeAndPbPercent = strPe + strPb + strReturnPePercent + strReturnPbPercent
    return strReturnPeAndPbPercent


def get_sw1_pe_and_pb(code, Count):
    # print("get_sw1_pe_and_pb")
    df = jqdatasdk.finance.run_query(
        query(jqdatasdk.finance.SW1_DAILY_VALUATION).filter(
            jqdatasdk.finance.SW1_DAILY_VALUATION.code == code).order_by(
            jqdatasdk.finance.SW1_DAILY_VALUATION.date.desc()).limit(Count))

    frameName = pd.DataFrame(df['name'])
    TodayName = frameName[0:1]
    framePe = pd.DataFrame(df['pe'])
    TodayPe = framePe[0:1]
    framePe.sort_values(by='pe', axis=0, ascending=True, inplace=True)
    framePb = pd.DataFrame(df['pb'])
    TodayPb = framePb[0:1]
    framePb.sort_values(by='pb', axis=0, ascending=True, inplace=True)

    strGetName = '%s ' % TodayName
    nEnd = len(strGetName)
    strGetName = strGetName[nEnd - 8:nEnd]
    strName = strGetName.strip()

    strGetPe = '%s ' % TodayPe
    nEnd = len(strGetPe)
    strGetPe = strGetPe[11:nEnd]
    strPe = strGetPe.strip()

    strGetPb = '%s ' % TodayPb
    nEnd = len(strGetPb)
    strGetPb = strGetPb[10:nEnd]
    strPb = strGetPb.strip()
    # PE
    nCountPe = 0
    fPe = float(strPe)
    for row in framePe.iterrows():
        if float(row[1]) <= fPe:
            nCountPe += 1
        else:
            break
    nCountPe /= Count
    nCountPe *= 100
    strReturnPePercent = "{:.2f}".format(nCountPe)
    strReturnPePercent = "当日市盈率(PE)百分位为:" + strReturnPePercent
    strPe = "当日市盈率(PE)是：" + strGetPe + ";  "
    # PB
    nCountPb = 0
    fPb = float(strPb)
    for row in framePb.iterrows():
        if float(row[1]) <= fPb:
            nCountPb += 1
        else:
            break
    nCountPb /= Count
    nCountPb *= 100
    strReturnPbPercent = "{:.2f}".format(nCountPb)
    strReturnPbPercent = "当日市净率(PB)百分位为:" + strReturnPbPercent
    strPb = "当日市净率(PB)是：" + strGetPb + ";  "
    strName = '%s ' % strName + ": "
    strReturnPeAndPbPercent = strName + '\n' + strPe + strPb + '\n' + strReturnPePercent + strReturnPbPercent + '\n'
    return strReturnPeAndPbPercent


def get_all_sw1_pe_and_pb(Count):
    print("get_all_sw1_pe_and_pb")
    # 先将所有要查询的行业代码放置到一个字符串数组里
    codeArr = ['801740', '801020', '801110', '801160', '801060', '801770', '801010', '801120', '801750', '801050',
               '801890', '801170', '801090', '801710', '801780', '801040', '801130', '801880', '801180', '801230',
               '801220', '801760', '801200', '801140', '801720', '801080', '801790', '801030', '801100', '801190',
               '801210', '801730', '801070', '801150']
    strReturn = ""
    for code in codeArr:
        strReturn += get_sw1_pe_and_pb(code, Count)

    return strReturn

