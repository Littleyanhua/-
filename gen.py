import json, os
OUT = "C:/Users/19200/Desktop/川藏线/rides/static/rides/js/app.js"

days = json.dumps([{'id':1,'n':'成都 → 雅安','d':140},{'id':2,'n':'雅安 → 泸定','d':135},{'id':3,'n':'泸定 → 新都桥','d':130},{'id':4,'n':'新都桥 → 理塘','d':200},{'id':5,'n':'理塘 → 巴塘','d':190},{'id':6,'n':'巴塘 → 芒康','d':105},{'id':7,'n':'芒康 → 左贡','d':155},{'id':8,'n':'左贡 → 八宿','d':200},{'id':9,'n':'八宿 → 波密','d':220},{'id':10,'n':'波密 → 八一镇','d':235},{'id':11,'n':'八一镇 → 松多','d':220},{'id':12,'n':'松多 → 拉萨','d':170}], ensure_ascii=False)
gear = json.dumps([{'n':'车辆装备','it':['山地自行车','头盔','骑行眼镜','修车工具','补胎片','打气筒','备用内胎','链条油','水壶架','驮包']},{'n':'骑行衣物','it':['骑行服','冲锋衣','抓绒衣','速干内衣','魔术头巾','骑行手套','护膝','雨衣']}],ensure_ascii=False)

js = "const{createApp,ref,computed,reactive,onMounted,nextTick}=Vue;\n"
js += "const DAYS=" + days + ";\n"
js += "const GEAR=" + gear + ";\n"
js += "const SR={};\nconst QUOTES=[];\n"
js += "const WCITIES=[\"成都\",\"雅安\",\"泸定\",\"康定\",\"理塘\",\"巴塘\",\"芒康\",\"左贡\",\"八宿\",\"波密\",\"林芝\",\"拉萨\"];\n"

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(js)
print("Generated " + str(len(js)) + " bytes")
