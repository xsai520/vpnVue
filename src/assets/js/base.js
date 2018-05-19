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
Base.tree = function (data,pid) {
  let self={};
  self.data = data ? data : null;
  self.array = [];
  self.pid = pid ? pid:null;
  if(self.data && self.pid){
    self.transform = function (pid) {
       data.map(function(val,index,arr){
         if(pid==val.id){
           self.array.push(val);
           self.transform(val.id)
         }
       })
    }
    self.transform(pid)
  }
};
export default Base;
