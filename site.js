function applyPixelNumbers(root = document.body) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !/\d/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest('script, style, noscript, textarea, code, pre, .pixel-number, .no-pixel-numbers')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const textNodes = [];
      let current;
      while ((current = walker.nextNode())) textNodes.push(current);
      textNodes.forEach((node) => {
        const parts = node.nodeValue.split(/(\d)/);
        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\d$/.test(part)) {
            const span = document.createElement('span');
            span.className = 'pixel-number';
            span.textContent = part;
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(part));
          }
        });
        node.parentNode.replaceChild(fragment, node);
      });
    }
    applyPixelNumbers();
