chrome.extension.onRequest.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.method == "getContent") {
    var check = request.data;
    var res = {};

    var title = document.getElementsByClassName("eugt34i1")[0];
    var bar = document.getElementsByClassName("e1o5n5iy0")[0];

    try {
      res["title"] = title.childNodes[0].innerText;

      if (check["difficulty"]) {
        res["difficulty"] = bar.childNodes[1].innerText;
      }

      if (check["liked"]) {
        res["liked"] = bar.childNodes[2].childNodes[1].innerText;
      }

      if (check["tags"]) {
        var tags = document.getElementsByClassName("topic-tags__1S89")[0];
        res["tags"] = [];
        for (tag of tags.childNodes) {
          res["tags"].push(tag.childNodes[0].innerText);
        }
      }

      if (check["description"]) {
        var description = document.getElementsByClassName("notranslate")[1];
        html = description.innerHTML.replace(/^\s*[\r\n]/gm, "");
        style =
          "<style>\n\
section pre{\n\
    background-color: #eee;\n\
    border: 1px solid #ddd;\n\
    padding:10px;\n\
    border-radius: 5px;\n\
}\n\
</style>\n";
        html = style + "<section>\n" + html + "</section>";
        res["description"] = html;
      }

      if (check["code"]) {
        var codeLines = document.getElementsByClassName("view-line");
        var codeType = document
          .getElementById("lang-select")
          .children[1].innerText.toLowerCase();
        console.log(codeType);
        switch (codeType) {
          case "c++":
            codeType = "cpp";
            break;
          case "python3":
            codeType = "python";
            break;
          case "c#":
            codeType = "csharp";
            break;
        }
        codeList = [];
        for (line of codeLines) {
          code = line.innerText.split(" ").join(" ") + "\n"; //注意这里的split()里的那个空格不是后面join里的空格，它是个特殊字符。
          pos = parseInt(line.style.top.split("px")[0]);
          codeList.push([code, pos]);
        }
        codeList.sort(function (a, b) {
          keyA = a[1];
          keyB = b[1];
          if (keyA > keyB) return 1;
          if (keyA < keyB) return -1;
          return 0;
        });
        codeString = codeList
          .map(function (e) {
            return e[0];
          })
          .join("");
        console.log(codeList, codeString);
        res["code"] = [codeType, codeString];
      }

      sendResponse({ data: res }); //same as innerText
    } catch (err) {
      alert(err.message);
    }
  }
});
