import pymysql

# 打开数据库连接，不指定数据库
# conn = pymysql.connect('106.52.116.108', 'root', 'NIHAOHANS2019')
conn = pymysql.connect('123.207.26.168', 'root', 'WANGfei123')
conn.select_db('index')


def insert_data(tableName, rating, Valuation, pe, pePercentile, pb, pbPercentile, ROE, DYR):
    cur = conn.cursor()  # 获取游标
    str = "insert into " + tableName
    sql = str + " (rating,Valuation,pe,pePercentile,pb,pbPercentile,ROE,DYR) values(%s,%s,%s,%s,%s,%s,%s,%s)"
    cur.execute(sql, (rating, Valuation, pe, pePercentile, pb, pbPercentile, ROE, DYR))
    cur.close()
    print('添加成功')


# 查询数据库中所有数据
# cur.execute("select * from sh_index;")
# while 1:
#     res = cur.fetchone()
#     if res is None:
#         # 表示已经取完结果集
#         break
#     print(res)

# 查询最后一条数据
def get_last_data_bytime(tableName):
    cur = conn.cursor()  # 获取游标
    str = "select * from " + tableName
    sql = str + "  order by create_time desc limit 1"
    # sql="select * from %s order by time desc limit 1"
    cur.execute(sql)
    res = cur.fetchone()
    print(res)
    cur.close()
    return res


insert_data("ssecdata", "41", "41%", "12", "12%", "41%", "12", "12%", "12%")
conn.commit()
conn.close()
print('sql执行成功')
