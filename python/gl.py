import jqdatasdk
from jqdatasdk import query
jqdatasdk.auth('18806662076', 'WANGfei123')
def get_gl_df(code,Date,Conut):
    myq = query(jqdatasdk.valuation).filter(jqdatasdk.valuation.code == code)
    GL_df = jqdatasdk.get_fundamentals_continuously(myq, end_date=Date, count=Conut, panel=False)
    return GL_df