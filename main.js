
var wrong=document.getElementById('wrong')
var main=document.getElementById('main')
var check_settings={}
var curr_link=''

chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var currTab=tabs[0]
    var currURL=currTab.url
    if( currURL.match("https?:\/\/leetcode\-cn\.com\/problems\/[^\/]*\/$")){
        wrong.style.display="none"
        main.style.display="block"
        curr_link=currURL
        loadSettings()
        addListeners(currTab)


    }else{
        wrong.style.display="block"
        main.style.display="none"
    }
});

function saveSettings(box){
    check_settings[box.id]=box.checked
    chrome.storage.sync.set({ check: check_settings });
}

function loadSettings(){
    var boxes=document.getElementsByTagName('input'); 
    chrome.storage.sync.get('check', function(data) {
        if(data.check){
            check_settings=data.check
            console.log(check_settings)
            for(box of boxes){
                console.log(check_settings[box.id],box.id)
                box.checked=check_settings[box.id]
            }
        }
    });
    
}

function addListeners(tab){
    var copyBtn=document.getElementById('copy')
    var downBtn=document.getElementById('down')
    copyBtn.addEventListener('click', function() {
        createMarkdown(tab,'copy');
    });
    downBtn.addEventListener('click', function() {
        createMarkdown(tab,'download');
    });
    var boxes = document.getElementsByTagName('input')
    for(box of boxes){
        box.addEventListener('click', function(){
            saveSettings(this)
        })
    }
}

function getChecked(){
    var boxes = document.getElementsByTagName('input')
    for(box of boxes){
        check_settings[box.id]=box.checked
    }
}


function createMarkdown(tab,op){
    getChecked()
    var markdown=''
    chrome.tabs.sendRequest(tab.id, { 
        method: "getContent",
        data: check_settings
    }, function(response) {
        var data=response.data
        markdown+="# ["+data['title']+"]("+curr_link+")\n\n"
        markdown+="---\n\n"
        var extra=false
        if(check_settings['difficulty']){
            markdown+="难度 `"+data['difficulty']+"`"
            extra=true
        }
        if(check_settings['tags']){
            if(extra)markdown+=" | "
            markdown+="标签 "
            for(tag of data['tags']){
                markdown+="`"+tag+"` "
            }
            extra=true
        }
        if(check_settings['failed'] || check_settings['longtime'] || check_settings['important'] || check_settings['interview'] || check_settings['badone']){ 
            if(extra)markdown+=" | "
            markdown+="个人标签 "
            if(check_settings['failed']){
                markdown+="❌"
            }
            if(check_settings['longtime']){
                markdown+="🌀"
            }
            if(check_settings['important']){
                markdown+="㊙️"
            }
            if(check_settings['interview']){
                markdown+="🔑"
            }
            if(check_settings['badone']){
                markdown+="👎"
            }
        }
        if(check_settings['liked']){
            if(extra)markdown+=" | "
            markdown+="获赞 `"+data['liked']+"`"
            extra=true
        }

        if(extra){
            markdown+="\n\n---\n\n"
        }
        if(check_settings['description']){
            markdown+="## Description\n\n"
            markdown+=data['description']
            markdown+="\n\n"
        }
        if(check_settings['code']){
            markdown+="## My Solution\n\n"
            markdown+="```"+data['code'][0]+"\n"
            markdown+=data['code'][1]
            markdown+="```"
            markdown+="\n\n"
        }
        if(op=='copy'){
            copy(markdown)
        }else if(op=='download'){
            download(markdown)
        }
    })
    
}

function copy(markdown){
    var dummy = document.createElement("textarea");
    // dummy.style.display="none"
    document.body.appendChild(dummy);
    dummy.value=markdown;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    var message = document.getElementById("message")
    message.style.display="block"
    setTimeout(() => {  
        message.style.display="none"
    }, 1800);
}


function customStyle(){
    // var style=""
}