!(function () {
  var e,
    n,
    t = {};
  (e = function (i) {
    var a,
      g = [],
      o = Object.keys,
      N = {},
      l = {},
      n = /^(no-?highlight|plain|text)$/i,
      c = /\blang(?:uage)?-([\w-]+)\b/i,
      t = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
      p = "</span>",
      h = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 };
    function v(e) {
      return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function d(e) {
      return e.nodeName.toLowerCase();
    }
    function O(e, n) {
      var a = e && e.exec(n);
      return a && 0 === a.index;
    }
    function u(e) {
      return n.test(e);
    }
    function b(e) {
      var n,
        a = {},
        t = Array.prototype.slice.call(arguments, 1);
      for (n in e) a[n] = e[n];
      return (
        t.forEach(function (e) {
          for (n in e) a[n] = e[n];
        }),
        a
      );
    }
    function E(e) {
      var i = [];
      return (
        (function e(n, a) {
          for (var t = n.firstChild; t; t = t.nextSibling)
            3 === t.nodeType
              ? (a += t.nodeValue.length)
              : 1 === t.nodeType &&
                (i.push({ event: "start", offset: a, node: t }),
                (a = e(t, a)),
                d(t).match(/br|hr|img|input/) || i.push({ event: "stop", offset: a, node: t }));
          return a;
        })(e, 0),
        i
      );
    }
    function f(e, n, a) {
      var t = 0,
        i = "",
        r = [];
      function s() {
        return e.length && n.length
          ? e[0].offset !== n[0].offset
            ? e[0].offset < n[0].offset
              ? e
              : n
            : "start" === n[0].event
            ? e
            : n
          : e.length
          ? e
          : n;
      }
      function l(e) {
        i +=
          "<" +
          d(e) +
          g.map
            .call(e.attributes, function (e) {
              return " " + e.nodeName + '="' + v(e.value).replace('"', "&quot;") + '"';
            })
            .join("") +
          ">";
      }
      function o(e) {
        i += "</" + d(e) + ">";
      }
      function c(e) {
        ("start" === e.event ? l : o)(e.node);
      }
      for (; e.length || n.length; ) {
        var u = s();
        if (((i += v(a.substring(t, u[0].offset))), (t = u[0].offset), u === e)) {
          for (r.reverse().forEach(o); c(u.splice(0, 1)[0]), (u = s()) === e && u.length && u[0].offset === t; );
          r.reverse().forEach(l);
        } else "start" === u[0].event ? r.push(u[0].node) : r.pop(), c(u.splice(0, 1)[0]);
      }
      return i + v(a.substr(t));
    }
    function r(e) {
      if (a && !e.langApiRestored) {
        for (var n in ((e.langApiRestored = !0), a)) e[n] && (e[a[n]] = e[n]);
        (e.contains || []).concat(e.variants || []).forEach(r);
      }
    }
    function M(s) {
      function c(e) {
        return (e && e.source) || e;
      }
      function l(e, n) {
        return new RegExp(c(e), "m" + (s.case_insensitive ? "i" : "") + (n ? "g" : ""));
      }
      !(function n(a, e) {
        if (!a.compiled) {
          if (((a.compiled = !0), (a.keywords = a.keywords || a.beginKeywords), a.keywords)) {
            function t(a, e) {
              s.case_insensitive && (e = e.toLowerCase()),
                e.split(" ").forEach(function (e) {
                  var n = e.split("|");
                  i[n[0]] = [a, n[1] ? Number(n[1]) : 1];
                });
            }
            var i = {};
            "string" == typeof a.keywords
              ? t("keyword", a.keywords)
              : o(a.keywords).forEach(function (e) {
                  t(e, a.keywords[e]);
                }),
              (a.keywords = i);
          }
          (a.lexemesRe = l(a.lexemes || /\w+/, !0)),
            e &&
              (a.beginKeywords && (a.begin = "\\b(" + a.beginKeywords.split(" ").join("|") + ")\\b"),
              a.begin || (a.begin = /\B|\b/),
              (a.beginRe = l(a.begin)),
              a.endSameAsBegin && (a.end = a.begin),
              a.end || a.endsWithParent || (a.end = /\B|\b/),
              a.end && (a.endRe = l(a.end)),
              (a.terminator_end = c(a.end) || ""),
              a.endsWithParent && e.terminator_end && (a.terminator_end += (a.end ? "|" : "") + e.terminator_end)),
            a.illegal && (a.illegalRe = l(a.illegal)),
            null == a.relevance && (a.relevance = 1),
            a.contains || (a.contains = []),
            (a.contains = Array.prototype.concat.apply(
              [],
              a.contains.map(function (e) {
                return (function (n) {
                  return (
                    n.variants &&
                      !n.cached_variants &&
                      (n.cached_variants = n.variants.map(function (e) {
                        return b(n, { variants: null }, e);
                      })),
                    n.cached_variants || (n.endsWithParent && [b(n)]) || [n]
                  );
                })("self" === e ? a : e);
              })
            )),
            a.contains.forEach(function (e) {
              n(e, a);
            }),
            a.starts && n(a.starts, e);
          var r = a.contains
            .map(function (e) {
              return e.beginKeywords ? "\\.?(?:" + e.begin + ")\\.?" : e.begin;
            })
            .concat([a.terminator_end, a.illegal])
            .map(c)
            .filter(Boolean);
          a.terminators = r.length
            ? l(
                (function (e, n) {
                  for (var a = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./, t = 0, i = "", r = 0; r < e.length; r++) {
                    var s = t,
                      l = c(e[r]);
                    for (0 < r && (i += n); 0 < l.length; ) {
                      var o = a.exec(l);
                      if (null == o) {
                        i += l;
                        break;
                      }
                      (i += l.substring(0, o.index)),
                        (l = l.substring(o.index + o[0].length)),
                        "\\" == o[0][0] && o[1] ? (i += "\\" + String(Number(o[1]) + s)) : ((i += o[0]), "(" == o[0] && t++);
                    }
                  }
                  return i;
                })(r, "|"),
                !0
              )
            : {
                exec: function () {
                  return null;
                },
              };
        }
      })(s);
    }
    function w(e, n, r, a) {
      function l(e, n, a, t) {
        var i = '<span class="' + (t ? "" : h.classPrefix);
        return e ? (i += e + '">') + n + (a ? "" : p) : n;
      }
      function s() {
        (d +=
          null != u.subLanguage
            ? (function () {
                var e = "string" == typeof u.subLanguage;
                if (e && !N[u.subLanguage]) return v(b);
                var n = e ? w(u.subLanguage, b, !0, g[u.subLanguage]) : R(b, u.subLanguage.length ? u.subLanguage : void 0);
                return 0 < u.relevance && (E += n.relevance), e && (g[u.subLanguage] = n.top), l(n.language, n.value, !1, !0);
              })()
            : (function () {
                var e, n, a, t, i, r, s;
                if (!u.keywords) return v(b);
                for (t = "", n = 0, u.lexemesRe.lastIndex = 0, a = u.lexemesRe.exec(b); a; )
                  (t += v(b.substring(n, a.index))),
                    (i = u),
                    (r = a),
                    void 0,
                    (s = c.case_insensitive ? r[0].toLowerCase() : r[0]),
                    (e = i.keywords.hasOwnProperty(s) && i.keywords[s]) ? ((E += e[1]), (t += l(e[0], v(a[0])))) : (t += v(a[0])),
                    (n = u.lexemesRe.lastIndex),
                    (a = u.lexemesRe.exec(b));
                return t + v(b.substr(n));
              })()),
          (b = "");
      }
      function o(e) {
        (d += e.className ? l(e.className, "", !0) : ""), (u = Object.create(e, { parent: { value: u } }));
      }
      function t(e, n) {
        if (((b += e), null == n)) return s(), 0;
        var a = (function (e, n) {
          var a, t, i;
          for (a = 0, t = n.contains.length; a < t; a++)
            if (O(n.contains[a].beginRe, e))
              return (
                n.contains[a].endSameAsBegin &&
                  (n.contains[a].endRe =
                    ((i = n.contains[a].beginRe.exec(e)[0]), new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m"))),
                n.contains[a]
              );
        })(n, u);
        if (a)
          return (
            a.skip ? (b += n) : (a.excludeBegin && (b += n), s(), a.returnBegin || a.excludeBegin || (b = n)),
            o(a),
            a.returnBegin ? 0 : n.length
          );
        var t = (function e(n, a) {
          if (O(n.endRe, a)) {
            for (; n.endsParent && n.parent; ) n = n.parent;
            return n;
          }
          if (n.endsWithParent) return e(n.parent, a);
        })(u, n);
        if (t) {
          var i = u;
          for (
            i.skip ? (b += n) : (i.returnEnd || i.excludeEnd || (b += n), s(), i.excludeEnd && (b = n));
            u.className && (d += p), u.skip || u.subLanguage || (E += u.relevance), (u = u.parent) !== t.parent;

          );
          return t.starts && (t.endSameAsBegin && (t.starts.endRe = t.endRe), o(t.starts)), i.returnEnd ? 0 : n.length;
        }
        if (
          (function (e, n) {
            return !r && O(n.illegalRe, e);
          })(n, u)
        )
          throw new Error('Illegal lexeme "' + n + '" for mode "' + (u.className || "<unnamed>") + '"');
        return (b += n), n.length || 1;
      }
      var c = y(e);
      if (!c) throw new Error('Unknown language: "' + e + '"');
      M(c);
      var i,
        u = a || c,
        g = {},
        d = "";
      for (i = u; i !== c; i = i.parent) i.className && (d = l(i.className, "", !0) + d);
      var b = "",
        E = 0;
      try {
        for (var f, _, m = 0; (u.terminators.lastIndex = m), (f = u.terminators.exec(n)); )
          (_ = t(n.substring(m, f.index), f[0])), (m = f.index + _);
        for (t(n.substr(m)), i = u; i.parent; i = i.parent) i.className && (d += p);
        return { relevance: E, value: d, language: e, top: u };
      } catch (e) {
        if (e.message && -1 !== e.message.indexOf("Illegal")) return { relevance: 0, value: v(n) };
        throw e;
      }
    }
    function R(a, e) {
      e = e || h.languages || o(N);
      var t = { relevance: 0, value: v(a) },
        i = t;
      return (
        e
          .filter(y)
          .filter(S)
          .forEach(function (e) {
            var n = w(e, a, !1);
            (n.language = e), n.relevance > i.relevance && (i = n), n.relevance > t.relevance && ((i = t), (t = n));
          }),
        i.language && (t.second_best = i),
        t
      );
    }
    function _(e) {
      return h.tabReplace || h.useBR
        ? e.replace(t, function (e, n) {
            return h.useBR && "\n" === e ? "<br>" : h.tabReplace ? n.replace(/\t/g, h.tabReplace) : "";
          })
        : e;
    }
    function s(e) {
      var n,
        a,
        t,
        i,
        r,
        s = (function (e) {
          var n,
            a,
            t,
            i,
            r = e.className + " ";
          if (((r += e.parentNode ? e.parentNode.className : ""), (a = c.exec(r)))) return y(a[1]) ? a[1] : "no-highlight";
          for (n = 0, t = (r = r.split(/\s+/)).length; n < t; n++) if (u((i = r[n])) || y(i)) return i;
        })(e);
      u(s) ||
        (h.useBR
          ? ((n = document.createElementNS("http://www.w3.org/1999/xhtml", "div")).innerHTML = e.innerHTML
              .replace(/\n/g, "")
              .replace(/<br[ \/]*>/g, "\n"))
          : (n = e),
        (r = n.textContent),
        (t = s ? w(s, r, !0) : R(r)),
        (a = E(n)).length &&
          (((i = document.createElementNS("http://www.w3.org/1999/xhtml", "div")).innerHTML = t.value), (t.value = f(a, E(i), r))),
        (t.value = _(t.value)),
        (e.innerHTML = t.value),
        (e.className = (function (e, n, a) {
          var t = n ? l[n] : a,
            i = [e.trim()];
          return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(t) && i.push(t), i.join(" ").trim();
        })(e.className, s, t.language)),
        (e.result = { language: t.language, re: t.relevance }),
        t.second_best && (e.second_best = { language: t.second_best.language, re: t.second_best.relevance }));
    }
    function m() {
      if (!m.called) {
        m.called = !0;
        var e = document.querySelectorAll("pre code");
        g.forEach.call(e, s);
      }
    }
    function y(e) {
      return (e = (e || "").toLowerCase()), N[e] || N[l[e]];
    }
    function S(e) {
      var n = y(e);
      return n && !n.disableAutodetect;
    }
    return (
      (i.highlight = w),
      (i.highlightAuto = R),
      (i.fixMarkup = _),
      (i.highlightBlock = s),
      (i.configure = function (e) {
        h = b(h, e);
      }),
      (i.initHighlighting = m),
      (i.initHighlightingOnLoad = function () {
        addEventListener("DOMContentLoaded", m, !1), addEventListener("load", m, !1);
      }),
      (i.registerLanguage = function (n, e) {
        var a = (N[n] = e(i));
        r(a),
          a.aliases &&
            a.aliases.forEach(function (e) {
              l[e] = n;
            });
      }),
      (i.listLanguages = function () {
        return o(N);
      }),
      (i.getLanguage = y),
      (i.autoDetection = S),
      (i.inherit = b),
      (i.IDENT_RE = "[a-zA-Z]\\w*"),
      (i.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*"),
      (i.NUMBER_RE = "\\b\\d+(\\.\\d+)?"),
      (i.C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
      (i.BINARY_NUMBER_RE = "\\b(0b[01]+)"),
      (i.RE_STARTERS_RE =
        "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
      (i.BACKSLASH_ESCAPE = { begin: "\\\\[\\s\\S]", relevance: 0 }),
      (i.APOS_STRING_MODE = { className: "string", begin: "'", end: "'", illegal: "\\n", contains: [i.BACKSLASH_ESCAPE] }),
      (i.QUOTE_STRING_MODE = { className: "string", begin: '"', end: '"', illegal: "\\n", contains: [i.BACKSLASH_ESCAPE] }),
      (i.PHRASAL_WORDS_MODE = {
        begin:
          /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
      }),
      (i.COMMENT = function (e, n, a) {
        var t = i.inherit({ className: "comment", begin: e, end: n, contains: [] }, a || {});
        return (
          t.contains.push(i.PHRASAL_WORDS_MODE),
          t.contains.push({ className: "doctag", begin: "(?:TODO|FIXME|NOTE|BUG|XXX):", relevance: 0 }),
          t
        );
      }),
      (i.C_LINE_COMMENT_MODE = i.COMMENT("//", "$")),
      (i.C_BLOCK_COMMENT_MODE = i.COMMENT("/\\*", "\\*/")),
      (i.HASH_COMMENT_MODE = i.COMMENT("#", "$")),
      (i.NUMBER_MODE = { className: "number", begin: i.NUMBER_RE, relevance: 0 }),
      (i.C_NUMBER_MODE = { className: "number", begin: i.C_NUMBER_RE, relevance: 0 }),
      (i.BINARY_NUMBER_MODE = { className: "number", begin: i.BINARY_NUMBER_RE, relevance: 0 }),
      (i.CSS_NUMBER_MODE = {
        className: "number",
        begin: i.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0,
      }),
      (i.REGEXP_MODE = {
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [i.BACKSLASH_ESCAPE, { begin: /\[/, end: /\]/, relevance: 0, contains: [i.BACKSLASH_ESCAPE] }],
      }),
      (i.TITLE_MODE = { className: "title", begin: i.IDENT_RE, relevance: 0 }),
      (i.UNDERSCORE_TITLE_MODE = { className: "title", begin: i.UNDERSCORE_IDENT_RE, relevance: 0 }),
      (i.METHOD_GUARD = { begin: "\\.\\s*" + i.UNDERSCORE_IDENT_RE, relevance: 0 }),
      i
    );
  }),
    (n = ("object" == typeof window && window) || ("object" == typeof self && self)),
    void 0 === t || t.nodeType
      ? n &&
        ((n.hljs = e({})),
        "function" == typeof define &&
          define.amd &&
          define([], function () {
            return n.hljs;
          }))
      : e(t);
  function i(e) {
    var n = { className: "variable", variants: [{ begin: /\$[\w\d#@][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }] },
      a = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, n, { className: "variable", begin: /\$\(/, end: /\)/, contains: [e.BACKSLASH_ESCAPE] }],
      };
    return {
      aliases: ["sh", "zsh"],
      lexemes: /\b-?[a-z\._]+\b/,
      keywords: {
        keyword: "if then else elif fi for while in do done case esac function",
        literal: "true false",
        built_in:
          "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
        _: "-ne -eq -lt -gt -f -d -e -s -l -a",
      },
      contains: [
        { className: "meta", begin: /^#![^\n]+sh\s*$/, relevance: 10 },
        {
          className: "function",
          begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
          returnBegin: !0,
          contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
          relevance: 0,
        },
        e.HASH_COMMENT_MODE,
        a,
        { className: "", begin: /\\"/ },
        { className: "string", begin: /'/, end: /'/ },
        n,
      ],
    };
  }
  function r(e) {
    return {
      contains: [
        { className: "attribute", begin: /</, end: />/ },
        {
          begin: /::=/,
          starts: {
            end: /$/,
            contains: [{ begin: /</, end: />/ }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE],
          },
        },
      ],
    };
  }
  function s(e) {
    var n = {
      begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
      returnBegin: !0,
      end: ";",
      endsWithParent: !0,
      contains: [
        {
          className: "attribute",
          begin: /\S/,
          end: ":",
          excludeEnd: !0,
          starts: {
            endsWithParent: !0,
            excludeEnd: !0,
            contains: [
              {
                begin: /[\w-]+\(/,
                returnBegin: !0,
                contains: [
                  { className: "built_in", begin: /[\w-]+/ },
                  { begin: /\(/, end: /\)/, contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] },
                ],
              },
              e.CSS_NUMBER_MODE,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              e.C_BLOCK_COMMENT_MODE,
              { className: "number", begin: "#[0-9A-Fa-f]+" },
              { className: "meta", begin: "!important" },
            ],
          },
        },
      ],
    };
    return {
      case_insensitive: !0,
      illegal: /[=\/|'\$]/,
      contains: [
        e.C_BLOCK_COMMENT_MODE,
        { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
        { className: "selector-class", begin: /\.[A-Za-z0-9_-]+/ },
        { className: "selector-attr", begin: /\[/, end: /\]/, illegal: "$" },
        { className: "selector-pseudo", begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
        { begin: "@(font-face|page)", lexemes: "[a-z-]+", keywords: "font-face page" },
        {
          begin: "@",
          end: "[{;]",
          illegal: /:/,
          contains: [
            { className: "keyword", begin: /\w+/ },
            {
              begin: /\s/,
              endsWithParent: !0,
              excludeEnd: !0,
              relevance: 0,
              contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE],
            },
          ],
        },
        { className: "selector-tag", begin: "[a-zA-Z-][a-zA-Z0-9_-]*", relevance: 0 },
        { begin: "{", end: "}", illegal: /\S/, contains: [e.C_BLOCK_COMMENT_MODE, n] },
      ],
    };
  }
  function l(e) {
    return {
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          variants: [
            { begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ },
            { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
            { begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ },
          ],
        },
        {
          className: "comment",
          variants: [
            { begin: /Index: /, end: /$/ },
            { begin: /={3,}/, end: /$/ },
            { begin: /^\-{3}/, end: /$/ },
            { begin: /^\*{3} /, end: /$/ },
            { begin: /^\+{3}/, end: /$/ },
            { begin: /\*{5}/, end: /\*{5}$/ },
          ],
        },
        { className: "addition", begin: "^\\+", end: "$" },
        { className: "deletion", begin: "^\\-", end: "$" },
        { className: "addition", begin: "^\\!", end: "$" },
      ],
    };
  }
  function o(e) {
    var n = "HTTP/[0-9\\.]+";
    return {
      aliases: ["https"],
      illegal: "\\S",
      contains: [
        { begin: "^" + n, end: "$", contains: [{ className: "number", begin: "\\b\\d{3}\\b" }] },
        {
          begin: "^[A-Z]+ (.*?) " + n + "$",
          returnBegin: !0,
          end: "$",
          contains: [
            { className: "string", begin: " ", end: " ", excludeBegin: !0, excludeEnd: !0 },
            { begin: n },
            { className: "keyword", begin: "[A-Z]+" },
          ],
        },
        { className: "attribute", begin: "^\\w", end: ": ", excludeEnd: !0, illegal: "\\n|\\s|=", starts: { end: "$", relevance: 0 } },
        { begin: "\\n\\n", starts: { subLanguage: [], endsWithParent: !0 } },
      ],
    };
  }
  function c(e) {
    var n = "[A-Za-z$_][0-9A-Za-z$_]*",
      a = {
        keyword:
          "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
        literal: "true false null undefined NaN Infinity",
        built_in:
          "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise",
      },
      t = {
        className: "number",
        variants: [{ begin: "\\b(0[bB][01]+)" }, { begin: "\\b(0[oO][0-7]+)" }, { begin: e.C_NUMBER_RE }],
        relevance: 0,
      },
      i = { className: "subst", begin: "\\$\\{", end: "\\}", keywords: a, contains: [] },
      r = { begin: "html`", end: "", starts: { end: "`", returnEnd: !1, contains: [e.BACKSLASH_ESCAPE, i], subLanguage: "xml" } },
      s = { begin: "css`", end: "", starts: { end: "`", returnEnd: !1, contains: [e.BACKSLASH_ESCAPE, i], subLanguage: "css" } },
      l = { className: "string", begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE, i] };
    i.contains = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, r, s, l, t, e.REGEXP_MODE];
    var o = i.contains.concat([e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE]);
    return {
      aliases: ["js", "jsx"],
      keywords: a,
      contains: [
        { className: "meta", relevance: 10, begin: /^\s*['"]use (strict|asm)['"]/ },
        { className: "meta", begin: /^#!/, end: /$/ },
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        r,
        s,
        l,
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        t,
        {
          begin: /[{,]\s*/,
          relevance: 0,
          contains: [{ begin: n + "\\s*:", returnBegin: !0, relevance: 0, contains: [{ className: "attr", begin: n, relevance: 0 }] }],
        },
        {
          begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          contains: [
            e.C_LINE_COMMENT_MODE,
            e.C_BLOCK_COMMENT_MODE,
            e.REGEXP_MODE,
            {
              className: "function",
              begin: "(\\(.*?\\)|" + n + ")\\s*=>",
              returnBegin: !0,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    { begin: n },
                    { begin: /\(\s*\)/ },
                    { begin: /\(/, end: /\)/, excludeBegin: !0, excludeEnd: !0, keywords: a, contains: o },
                  ],
                },
              ],
            },
            { className: "", begin: /\s/, end: /\s*/, skip: !0 },
            {
              begin: /</,
              end: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
              subLanguage: "xml",
              contains: [
                { begin: /<[A-Za-z0-9\\._:-]+\s*\/>/, skip: !0 },
                {
                  begin: /<[A-Za-z0-9\\._:-]+/,
                  end: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
                  skip: !0,
                  contains: [{ begin: /<[A-Za-z0-9\\._:-]+\s*\/>/, skip: !0 }, "self"],
                },
              ],
            },
          ],
          relevance: 0,
        },
        {
          className: "function",
          beginKeywords: "function",
          end: /\{/,
          excludeEnd: !0,
          contains: [
            e.inherit(e.TITLE_MODE, { begin: n }),
            { className: "params", begin: /\(/, end: /\)/, excludeBegin: !0, excludeEnd: !0, contains: o },
          ],
          illegal: /\[|%/,
        },
        { begin: /\$[(.]/ },
        e.METHOD_GUARD,
        {
          className: "class",
          beginKeywords: "class",
          end: /[{;=]/,
          excludeEnd: !0,
          illegal: /[:"\[\]]/,
          contains: [{ beginKeywords: "extends" }, e.UNDERSCORE_TITLE_MODE],
        },
        { beginKeywords: "constructor get set", end: /\{/, excludeEnd: !0 },
      ],
      illegal: /#(?!!)/,
    };
  }
  function u(e) {
    var n = { literal: "true false null" },
      a = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
      t = { end: ",", endsWithParent: !0, excludeEnd: !0, contains: a, keywords: n },
      i = {
        begin: "{",
        end: "}",
        contains: [
          { className: "attr", begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE], illegal: "\\n" },
          e.inherit(t, { begin: /:/ }),
        ],
        illegal: "\\S",
      },
      r = { begin: "\\[", end: "\\]", contains: [e.inherit(t)], illegal: "\\S" };
    return a.splice(a.length, 0, i, r), { contains: a, keywords: n, illegal: "\\S" };
  }
  function g(e) {
    var n = {
        className: "variable",
        variants: [{ begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)", contains: [e.BACKSLASH_ESCAPE] }, { begin: /\$[@%<?\^\+\*]/ }],
      },
      a = { className: "string", begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE, n] },
      t = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in:
            "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value",
        },
        contains: [n],
      },
      i = {
        begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*[:+?]?=",
        illegal: "\\n",
        returnBegin: !0,
        contains: [{ begin: "^" + e.UNDERSCORE_IDENT_RE, end: "[:+?]?=", excludeEnd: !0 }],
      },
      r = { className: "section", begin: /^[^\s]+:/, end: /$/, contains: [n] };
    return {
      aliases: ["mk", "mak"],
      keywords: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",
      lexemes: /[\w-]+/,
      contains: [
        e.HASH_COMMENT_MODE,
        n,
        a,
        t,
        i,
        { className: "meta", begin: /^\.PHONY:/, end: /$/, keywords: { "meta-keyword": ".PHONY" }, lexemes: /[\.\w]+/ },
        r,
      ],
    };
  }
  function d(e) {
    var n = "([ui](8|16|32|64|128|size)|f(32|64))?",
      a =
        "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
    return {
      aliases: ["rs"],
      keywords: {
        keyword:
          "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
        literal: "true false Some None Ok Err",
        built_in: a,
      },
      lexemes: e.IDENT_RE + "!?",
      illegal: "</",
      contains: [
        e.C_LINE_COMMENT_MODE,
        e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
        e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
        { className: "string", variants: [{ begin: /r(#*)"(.|\n)*?"\1(?!#)/ }, { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }] },
        { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ },
        {
          className: "number",
          variants: [
            { begin: "\\b0b([01_]+)" + n },
            { begin: "\\b0o([0-7_]+)" + n },
            { begin: "\\b0x([A-Fa-f0-9_]+)" + n },
            { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n },
          ],
          relevance: 0,
        },
        { className: "function", beginKeywords: "fn", end: "(\\(|<)", excludeEnd: !0, contains: [e.UNDERSCORE_TITLE_MODE] },
        { className: "meta", begin: "#\\!?\\[", end: "\\]", contains: [{ className: "meta-string", begin: /"/, end: /"/ }] },
        {
          className: "class",
          beginKeywords: "type",
          end: ";",
          contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: !0 })],
          illegal: "\\S",
        },
        {
          className: "class",
          beginKeywords: "trait enum struct union",
          end: "{",
          contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: !0 })],
          illegal: "[\\w\\d]",
        },
        { begin: e.IDENT_RE + "::", keywords: { built_in: a } },
        { begin: "->" },
      ],
    };
  }
  function b(e) {
    return {
      aliases: ["console"],
      contains: [{ className: "meta", begin: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]", starts: { end: "$", subLanguage: "bash" } }],
    };
  }
  !(function () {
    "use strict";
    var n, a;
    t.registerLanguage("bash", i),
      t.registerLanguage("bnf", r),
      t.registerLanguage("css", s),
      t.registerLanguage("diff", l),
      t.registerLanguage("http", o),
      t.registerLanguage("javascript", c),
      t.registerLanguage("json", u),
      t.registerLanguage("makefile", g),
      t.registerLanguage("rust", d),
      t.registerLanguage("shell", b),
      (n = { className: "string", variants: [{ begin: /r(#*)"(.|\n)*?"\1(?!#)/ }, { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }] }),
      (a = {
        className: "number",
        variants: [{ begin: "[+-]?\\b0[xX]([A-Fa-f0-9_]+)" }, { begin: "[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" }],
        relevance: 0,
      }),
      t.registerLanguage("motoko", function (e) {
        return {
          name: "Motoko",
          aliases: ["mo"],
          keywords: {
            $pattern: "[a-zA-Z_]\\w*",
            keyword:
              "actor and await break case catch class continue debug do else for func if in import module not object or label let loop private public return shared try throw query switch type var while stable flexible system debug_show assert ignore",
            literal: "true false null",
            built_in:
              "Any None Null Bool Int Int8 Int16 Int32 Int64 Nat Nat8 Nat16 Nat32 Nat64 Word8 Word16 Word32 Word64 Float Char Text Blob Error Principal async",
          },
          illegal: "</",
          contains: [
            e.C_LINE_COMMENT_MODE,
            e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
            e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
            n,
            a,
            { className: "symbol", begin: "#" + e.UNDERSCORE_IDENT_RE },
            { className: "function", beginKeywords: "func", end: "(\\(|<|=|{)", excludeEnd: !0, contains: [e.UNDERSCORE_TITLE_MODE] },
            {
              className: "class",
              begin: "\\b(actor( class)?|module|object)\\b",
              keywords: "actor class module object",
              end: "(\\(|<|{)",
              contains: [e.UNDERSCORE_TITLE_MODE],
              illegal: "[\\w\\d]",
            },
            {
              className: "built_in",
              beginKeywords: "import type",
              end: "(;|$|=)",
              excludeEnd: !0,
              contains: [e.QUOTE_STRING_MODE, e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", { contains: ["self"] })],
            },
          ],
        };
      }),
      t.registerLanguage("candid", function (e) {
        return {
          name: "Candid",
          aliases: ["did"],
          keywords: {
            $pattern: "[a-zA-Z_]\\w*",
            keyword: "import service type",
            built_in:
              "opt vec record variant func blob principal nat nat8 nat16 nat32 nat64 int int8 int16 int32 int64 float32 float64 bool text null reserved empty oneway query",
          },
          illegal: "</",
          contains: [
            e.C_LINE_COMMENT_MODE,
            e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
            e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
            n,
            a,
          ],
        };
      }),
      t.initHighlighting(),
      (window.hljs = t);
  })();
})();
