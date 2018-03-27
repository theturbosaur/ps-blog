var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
        ? self
        : {},
  Prism = (function() {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      a = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler:
          _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function(e) {
            return e instanceof n
              ? new n(e.type, a.util.encode(e.content), e.alias)
              : 'Array' === a.util.type(e)
                ? e.map(a.util.encode)
                : e
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/\u00a0/g, ' ');
          },
          type: function(e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function(e) {
            return (
              e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id
            );
          },
          clone: function(e) {
            var t = a.util.type(e);
            switch (t) {
              case 'Object':
                var n = {};
                for (var r in e)
                  e.hasOwnProperty(r) && (n[r] = a.util.clone(e[r]));
                return n;
              case 'Array':
                return e.map(function(e) {
                  return a.util.clone(e);
                });
            }
            return e;
          },
        },
        languages: {
          extend: function(e, t) {
            var n = a.util.clone(a.languages[e]);
            for (var r in t) n[r] = t[r];
            return n;
          },
          insertBefore: function(e, t, n, r) {
            r = r || a.languages;
            var i = r[e];
            if (2 == arguments.length) {
              n = arguments[1];
              for (var s in n) n.hasOwnProperty(s) && (i[s] = n[s]);
              return i;
            }
            var l = {};
            for (var o in i)
              if (i.hasOwnProperty(o)) {
                if (o == t)
                  for (var s in n) n.hasOwnProperty(s) && (l[s] = n[s]);
                l[o] = i[o];
              }
            return (
              a.languages.DFS(a.languages, function(t, a) {
                a === r[e] && t != e && (this[t] = l);
              }),
              (r[e] = l)
            );
          },
          DFS: function(e, t, n, r) {
            r = r || {};
            for (var i in e)
              e.hasOwnProperty(i) &&
                (t.call(e, i, e[i], n || i),
                'Object' !== a.util.type(e[i]) || r[a.util.objId(e[i])]
                  ? 'Array' !== a.util.type(e[i]) ||
                    r[a.util.objId(e[i])] ||
                    ((r[a.util.objId(e[i])] = !0),
                    a.languages.DFS(e[i], t, i, r))
                  : ((r[a.util.objId(e[i])] = !0),
                    a.languages.DFS(e[i], t, null, r)));
          },
        },
        plugins: {},
        highlightAll: function(e, t) {
          a.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function(e, t, n) {
          var r = {
            callback: n,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          a.hooks.run('before-highlightall', r);
          for (
            var i, s = r.elements || e.querySelectorAll(r.selector), l = 0;
            (i = s[l++]);

          )
            a.highlightElement(i, t === !0, r.callback);
        },
        highlightElement: function(t, n, r) {
          for (var i, s, l = t; l && !e.test(l.className); ) l = l.parentNode;
          l &&
            ((i = (l.className.match(e) || [, ''])[1].toLowerCase()),
            (s = a.languages[i])),
            (t.className =
              t.className.replace(e, '').replace(/\s+/g, ' ') +
              ' language-' +
              i),
            t.parentNode &&
              ((l = t.parentNode),
              /pre/i.test(l.nodeName) &&
                (l.className =
                  l.className.replace(e, '').replace(/\s+/g, ' ') +
                  ' language-' +
                  i));
          var o = t.textContent,
            u = { element: t, language: i, grammar: s, code: o };
          if ((a.hooks.run('before-sanity-check', u), !u.code || !u.grammar))
            return (
              u.code &&
                (a.hooks.run('before-highlight', u),
                (u.element.textContent = u.code),
                a.hooks.run('after-highlight', u)),
              void a.hooks.run('complete', u)
            );
          if ((a.hooks.run('before-highlight', u), n && _self.Worker)) {
            var g = new Worker(a.filename);
            (g.onmessage = function(e) {
              (u.highlightedCode = e.data),
                a.hooks.run('before-insert', u),
                (u.element.innerHTML = u.highlightedCode),
                r && r.call(u.element),
                a.hooks.run('after-highlight', u),
                a.hooks.run('complete', u);
            }),
              g.postMessage(
                JSON.stringify({
                  language: u.language,
                  code: u.code,
                  immediateClose: !0,
                })
              );
          } else
            (u.highlightedCode = a.highlight(u.code, u.grammar, u.language)),
              a.hooks.run('before-insert', u),
              (u.element.innerHTML = u.highlightedCode),
              r && r.call(t),
              a.hooks.run('after-highlight', u),
              a.hooks.run('complete', u);
        },
        highlight: function(e, t, r) {
          var i = a.tokenize(e, t);
          return n.stringify(a.util.encode(i), r);
        },
        matchGrammar: function(e, t, n, r, i, s, l) {
          var o = a.Token;
          for (var u in n)
            if (n.hasOwnProperty(u) && n[u]) {
              if (u == l) return;
              var g = n[u];
              g = 'Array' === a.util.type(g) ? g : [g];
              for (var c = 0; c < g.length; ++c) {
                var d = g[c],
                  p = d.inside,
                  m = !!d.lookbehind,
                  h = !!d.greedy,
                  f = 0,
                  y = d.alias;
                if (h && !d.pattern.global) {
                  var b = d.pattern.toString().match(/[imuy]*$/)[0];
                  d.pattern = RegExp(d.pattern.source, b + 'g');
                }
                d = d.pattern || d;
                for (var v = r, k = i; v < t.length; k += t[v].length, ++v) {
                  var P = t[v];
                  if (t.length > e.length) return;
                  if (!(P instanceof o)) {
                    d.lastIndex = 0;
                    var w = d.exec(P),
                      x = 1;
                    if (!w && h && v != t.length - 1) {
                      if (((d.lastIndex = k), (w = d.exec(e)), !w)) break;
                      for (
                        var F = w.index + (m ? w[1].length : 0),
                          S = w.index + w[0].length,
                          A = v,
                          _ = k,
                          j = t.length;
                        A < j && (_ < S || (!t[A].type && !t[A - 1].greedy));
                        ++A
                      )
                        (_ += t[A].length), F >= _ && (++v, (k = _));
                      if (t[v] instanceof o || t[A - 1].greedy) continue;
                      (x = A - v), (P = e.slice(k, _)), (w.index -= k);
                    }
                    if (w) {
                      m && (f = w[1] ? w[1].length : 0);
                      var F = w.index + f,
                        w = w[0].slice(f),
                        S = F + w.length,
                        C = P.slice(0, F),
                        N = P.slice(S),
                        O = [v, x];
                      C && (++v, (k += C.length), O.push(C));
                      var E = new o(u, p ? a.tokenize(w, p) : w, y, w, h);
                      if (
                        (O.push(E),
                        N && O.push(N),
                        Array.prototype.splice.apply(t, O),
                        1 != x && a.matchGrammar(e, t, n, v, k, !0, u),
                        s)
                      )
                        break;
                    } else if (s) break;
                  }
                }
              }
            }
        },
        tokenize: function(e, t, n) {
          var r = [e],
            i = t.rest;
          if (i) {
            for (var s in i) t[s] = i[s];
            delete t.rest;
          }
          return a.matchGrammar(e, r, t, 0, 0, !1), r;
        },
        hooks: {
          all: {},
          add: function(e, t) {
            var n = a.hooks.all;
            (n[e] = n[e] || []), n[e].push(t);
          },
          run: function(e, t) {
            var n = a.hooks.all[e];
            if (n && n.length) for (var r, i = 0; (r = n[i++]); ) r(t);
          },
        },
      }),
      n = (a.Token = function(e, t, a, n, r) {
        (this.type = e),
          (this.content = t),
          (this.alias = a),
          (this.length = 0 | (n || '').length),
          (this.greedy = !!r);
      });
    if (
      ((n.stringify = function(e, t, r) {
        if ('string' == typeof e) return e;
        if ('Array' === a.util.type(e))
          return e
            .map(function(a) {
              return n.stringify(a, t, e);
            })
            .join('');
        var i = {
          type: e.type,
          content: n.stringify(e.content, t, r),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: t,
          parent: r,
        };
        if (e.alias) {
          var s = 'Array' === a.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(i.classes, s);
        }
        a.hooks.run('wrap', i);
        var l = Object.keys(i.attributes)
          .map(function(e) {
            return (
              e + '="' + (i.attributes[e] || '').replace(/"/g, '&quot;') + '"'
            );
          })
          .join(' ');
        return (
          '<' +
          i.tag +
          ' class="' +
          i.classes.join(' ') +
          '"' +
          (l ? ' ' + l : '') +
          '>' +
          i.content +
          '</' +
          i.tag +
          '>'
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (a.disableWorkerMessageHandler ||
            _self.addEventListener(
              'message',
              function(e) {
                var t = JSON.parse(e.data),
                  n = t.language,
                  r = t.code,
                  i = t.immediateClose;
                _self.postMessage(a.highlight(r, a.languages[n], n)),
                  i && _self.close();
              },
              !1
            ),
          _self.Prism)
        : _self.Prism;
    var r =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName('script')).pop();
    return (
      r &&
        ((a.filename = r.src),
        a.manual ||
          r.hasAttribute('data-manual') ||
          ('loading' !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(a.highlightAll)
              : window.setTimeout(a.highlightAll, 16)
            : document.addEventListener('DOMContentLoaded', a.highlightAll))),
      _self.Prism
    );
  })();
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism),
  (Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        'attr-value': {
          pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
          },
        },
        punctuation: /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ },
        },
      },
    },
    entity: /&#?[\da-z]{1,8};/i,
  }),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function(e) {
    'entity' === e.type &&
      (e.attributes.title = e.content.replace(/&amp;/, '&'));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
      inside: { rule: /@[\w-]+/ },
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/,
  }),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(
    Prism.languages.css
  )),
  Prism.languages.markup &&
    (Prism.languages.insertBefore('markup', 'tag', {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: 'language-css',
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: 'language-css',
        },
      },
      Prism.languages.markup.tag
    )),
  (Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    'class-name': {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.javascript = Prism.languages.extend('clike', {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
  })),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0,
    },
    'function-variable': {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: 'function',
    },
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation',
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: 'language-javascript',
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript),
  (function() {
    'undefined' != typeof self &&
      self.Prism &&
      self.document &&
      document.querySelector &&
      ((self.Prism.fileHighlight = function() {
        var e = {
          js: 'javascript',
          py: 'python',
          rb: 'ruby',
          ps1: 'powershell',
          psm1: 'powershell',
          sh: 'bash',
          bat: 'batch',
          h: 'c',
          tex: 'latex',
        };
        Array.prototype.slice
          .call(document.querySelectorAll('pre[data-src]'))
          .forEach(function(t) {
            for (
              var a,
                n = t.getAttribute('data-src'),
                r = t,
                i = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
              r && !i.test(r.className);

            )
              r = r.parentNode;
            if ((r && (a = (t.className.match(i) || [, ''])[1]), !a)) {
              var s = (n.match(/\.(\w+)$/) || [, ''])[1];
              a = e[s] || s;
            }
            var l = document.createElement('code');
            (l.className = 'language-' + a),
              (t.textContent = ''),
              (l.textContent = 'Loading…'),
              t.appendChild(l);
            var o = new XMLHttpRequest();
            o.open('GET', n, !0),
              (o.onreadystatechange = function() {
                4 == o.readyState &&
                  (o.status < 400 && o.responseText
                    ? ((l.textContent = o.responseText),
                      Prism.highlightElement(l))
                    : o.status >= 400
                      ? (l.textContent =
                          '✖ Error ' +
                          o.status +
                          ' while fetching file: ' +
                          o.statusText)
                      : (l.textContent =
                          '✖ Error: File does not exist or is empty'));
              }),
              o.send(null);
          });
      }),
      document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight));
  })();
