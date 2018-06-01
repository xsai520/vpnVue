/**
 * Created by Administrator on 2018/5/10 0010.
 */
let Base={};
Base.getParams = function(form,isStr){//isStr 表示是否拼接成字符串
  let params = null;//需要返回出去的参数
  let self={};
  isStr?params="":params={};
  self.form = form?form:null;
  //将button radio checkbox select选项是请选择的特殊的选项区分出来
  if(self.form){
    let elems = self.form[0].elements;//转换成dom对象
    for(let i=0;i<elems.length;i++){
      let o = elems[i];
      let name = $(o).attr("name");
      if(!name){continue;}//判断是否有name属性
      if(o.tagName.toLowerCase() =="input"){ //标签名称转小写
        let type = $(o).attr("type").toLowerCase();
        if(type == "checkbox" || type == "radio"){ //所有checkbox和radio的name值都是相同的
          if(typeof(params)=="object" && params[name]){ //如果是对象之前存在相同的name则过滤掉
            continue;
          }else{
            let vals="";
            self.form.find("input[name='"+name+"']").each(function(i1,o1){
              if($("o1").is("checked")){
                if(vals==""){
                  vals=$("o1").val();
                }else{
                  vals+=","+$("o1").val();
                }
              }
            });
            if(vals!=""){
              if(isStr){
                if(params==""){
                  params+= name+"="+vals;
                }else{ //不同参数之间用&连接
                  params+="&" +name+"="+vals;
                }
              }else{
                params[name] = vals;
              }
            }
          }
        }else if(type=="button"){
          continue;
        }else{ //type 为text的 input框
          if($(o).val()){//判断值是否存在，存在即传，不存在忽略
            if(isStr){
              if(params==""){
                params += name+"="+$(o).val(); //value值是否需要编码视情况而定
              }else{
                params += "&"+ name +"="+$(o).val();
              }
            }else{
              params[name]=$(o).val();
            }
          }
        }
      }else if(o.tagName.toLowerCase()== "select" && $(o).val()==-1){ //select值为-1时候不进行选择
        continue;
      }else if(o.tagName.toLowerCase()=="button"){
        continue;
      }else{
        if(isStr){
          if(params==""){
            params+=name+"="+$(o).val();
          }else{
            params+="&"+name+"="+$(o).val();
          }
        }else{
          params[name] = $(o).val();
        }
      }
    }
  }
  return params;
};
//一般的做法是将一级数组取出，然后循环数组，找出其中pid是一级数组id的
//先转换为map对象，将id作为key值
Base.arrayToMap = function (data) {
  let self = {};
  self.data = data?data:null;
  self.map = {};
  if(self.data && self.data.length>0){
    self.transform = function () {
      self.data.forEach(function (val,index) {
        self.map[val.id] = val;
      })
    }
  }
  self.transform();
  return self.map;
};
Base.mapToArray = function (data,pid) {
  let self = {};
  self.data = data ? data : null;
  self.pid = (pid==0 || pid) ? pid : null;
  self.array = [];
  if(self.data && (self.pid==0 || self.pid)){
    self.transform = function (pid,node) {
      for(let key in self.data){
        let nodeData = self.data[key];
        if(nodeData.pid ==pid){
          if(node){ //node不存在时表示第一次调用
            if(!node.children){
              node.children=[];
            }
            node.children.push(nodeData);
            self.transform(nodeData.id,nodeData)
          }else{
            self.array.push(nodeData);
            self.transform(nodeData.id,nodeData)
          }
        }

      }
    };
    self.transform(pid);
    return self.array;
  }
};
Base.validateForm = function (rule,value,callback) { //只验证rules中的validator调用的方法
  let self = {}; //暂时先只有正则的验证
  self.type = rule.type;
  self.reg = rule.reg ? rule.reg:null;
  self.message = rule.message ? rule.message : "输入错误";
  if(!self.reg.test(value)){
    return callback(new Error(self.message));
  }else{
    return callback();
  }

};
Base.clearObj = function (obj) {
  if(obj){
    for(let key in obj){
      obj[key]="";
    }
    return obj;
  }

};
export default Base;
