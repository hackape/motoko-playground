function changeCodeBlock() {
  for (var e = document.getElementsByTagName("pre"), t = 0; t < e.length; t++) {
    var n = e[t],
      i = n.firstChild;
    if (i && "CODE" === i.tagName) if (i.classList.contains("language-motoko")) n.classList.add("motoko"), appendRun(n, extractConfig(n));
  }
}
function extractConfig(e) {
  var t = e.parentNode.parentNode,
    n = t.getAttribute("id");
  n && (n += ".mo");
  for (var i = [], o = null, r = 0; r < t.classList.length; r++) {
    var l = t.classList[r];
    if (l.startsWith("include")) for (var s = l.split("_"), a = 1; a < s.length; a++) i.push(s[a]);
    else if (l.startsWith("hook")) {
      o = (s = l.split("_"))[1];
    }
  }
  return {
    name: n,
    include: i,
    hook: o,
    lineNumber: true,
    isRun: t.classList.contains("run"),
    noRepl: t.classList.contains("no-repl"),
  };
}
function highlightCode(e) {
  var t = e.firstChild.innerText;
  (e.firstChild.textContent = t), window.hljs.highlightBlock(e);
}
function saveIncluded(e) {
  for (var t = {}, n = 0; n < e.length; n++) {
    var i = document.getElementById(e[n]).querySelector("div.content").querySelector("pre").querySelector("code").innerText,
      o = e[n] + ".mo";
    Motoko.saveFile(o, i), (t[o] = i);
  }
  return t;
}
function appendRun(s, a) {
  if ((a.name && Motoko.saveFile(a.name, s.firstChild.innerText), !a.noRepl)) {
    var e,
      t = s.parentNode;
    console.log("wtf", a, t);
    e = a.lineNumber ? window.withLineNumbers(highlightCode) : highlightCode;
    window.CodeJar(s, e, { tab: "  " });
    a.lineNumber ? (s.style = "padding-left: calc(35px)") : (s.style = ""), (t.style = "position:relative");
    var n = document.createElement("button"),
      d = document.createElement("div");
    (d.classList = "listingblock"),
      a.isRun && (d.innerHTML = "<pre>Loading...</pre>"),
      (n.innerHTML =
        '<span class="run-label">Run</span><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style="width: 35px; height: 35px;"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></g></svg>'),
      (n.classList = "run-button"),
      t.appendChild(n),
      t.appendChild(d),
      n.addEventListener("click", function () {
        var e,
          t,
          n = saveIncluded(a.include),
          i = s.firstChild.innerText,
          o = a.name || "stdin";
        if ((Motoko.saveFile(o, i), a.hook)) {
          var r = window[a.hook];
          if ("function" != typeof r) throw new Error(a.hook + " is not a function");
          e = r.apply(null, [n, i]);
        } else {
          var l = a.include.map(function (e) {
            return e + ".mo";
          });
          e = Motoko.run(l, o);
        }
        (d.innerHTML = ""),
          e.stderr && (((t = document.createElement("pre")).style = "color:red"), (t.innerText = e.stderr), d.appendChild(t));
        e.stdout && (((t = document.createElement("pre")).style = "color:green"), (t.innerText = e.stdout), d.appendChild(t));
        highlightCode(s);
      }),
      a.isRun && n.click();
  }
}
