/**
 * Created by Administrator on 2019/4/25.
 */
const express = require("express");
const history = require("connect-history-api-fallback");
app.use(history({
  // index:"index.html",->index属性默认值为指向index.html
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
app.use(express.static(__dirname + "/dist"));
app.listen(80, function () {
  console.log("success");
});
