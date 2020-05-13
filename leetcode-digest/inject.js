chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log('!!2',request)
        if(request.method == "getContent"){
            var check=request.data
            var res={}

            var title=document.getElementsByClassName("css-tt3ivf-Title eugt34i1")[0]
            var bar=document.getElementsByClassName("css-14c3gsg-Tools e1o5n5iy0")[0]

            res["title"]=title.childNodes[0].innerText

            if (check["difficulty"]){
                res["difficulty"]=bar.childNodes[1].innerText
            }

            if (check["liked"]){
                res["liked"]=bar.childNodes[2].childNodes[1].innerText
            }

            if (check["tags"]){
                var tags=document.getElementsByClassName("topic-tags__1S89")[0]
                res["tags"]=[]
                for(tag of tags.childNodes){
                    res["tags"].push(tag.childNodes[0].innerText)
                }
            }

            if (check["description"]){
                var description=document.getElementsByClassName("notranslate")[1]
                console.log('??',description)
                res["description"]=description.innerHTML
            }

            if (check["code"]){
                var codeLines=document.getElementsByClassName("view-line")
                var codeType=document.getElementsByClassName("ant-select-selection-selected-value")[0].innerText.toLowerCase()
                switch(codeType){
                    case "c++": codeType="cpp";break;
                    case "python3": codeType="python";break;
                    case "c#": codeType="csharp";break;
                }
                res["code"]=[codeType,'']
                for(line of codeLines){
                    res["code"][1]+=line.innerText+'\n'
                }

            }



            sendResponse({data: res}); //same as innerText
        }
    }
);
