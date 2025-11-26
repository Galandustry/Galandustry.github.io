(function () {
  const html = `
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="drawer">
    <h3>瀵艰埅</h3>
    <a href="index.html">涓婚〉</a>
    <a href="profile.html">涓汉浠嬬粛</a>
    <a href="hobbies.html">瀛︿範鏂瑰悜</a>
    <a href="noita-records.html">Noita</a>
    <h3>C++闅忔満绗旇</h3>
    <a href="javascript:void(0)" id="open-note">鎵撳紑闅忔満绗旇</a>
    <h3>宸ュ叿涓庡父鐢ㄧ珯鐐?/h3>
    <div class="drawer-tree" id="tools-tree">
      <div class="branch" data-target="dev" aria-expanded="false">
        <span class="caret"></span><span>缂栫▼涓庡紑鍙戝伐鍏?/span>
      </div>
      <ul class="children" id="dev">
        <li><a class="leaf" href="https://github.com/" target="_blank" rel="noreferrer noopener">GitHub</a></li>
        <li><a class="leaf" href="https://oi-wiki.org/" target="_blank" rel="noreferrer noopener">OI Wiki</a></li>
        <li><a class="leaf" href="https://www.luogu.com.cn/" target="_blank" rel="noreferrer noopener">娲涜胺</a></li>
        <li><a class="leaf" href="https://leetcode.cn/leetbook/" target="_blank" rel="noreferrer noopener">LeetBook</a></li>
        <li><a class="leaf" href="https://visualgo.net/zh" target="_blank" rel="noreferrer noopener">VisuAlgo</a></li>
        <li><a class="leaf" href="https://en.cppreference.com/w/" target="_blank" rel="noreferrer noopener">C++ reference</a></li>
        <li><a class="leaf" href="https://learn.microsoft.com/zh-cn/dotnet/csharp/" target="_blank" rel="noreferrer noopener">C# 鏂囨。</a></li>
        <li><a class="leaf" href="https://docs.godotengine.org/en/stable/" target="_blank" rel="noreferrer noopener">Godot 鏂囨。</a></li>
        <li><a class="leaf" href="https://www.stroustrup.com/" target="_blank" rel="noreferrer noopener">Bjarne Stroustrup</a></li>
        <li><a class="leaf" href="https://guidebook.hustunique.com/" target="_blank" rel="noreferrer noopener">鑱斿垱鍥㈤槦鎸囧寳</a></li>
        <li><a class="leaf" href="https://liaoxuefeng.com/index.html" target="_blank" rel="noreferrer noopener">寤栭洩宄?/a></li>
        <li><a class="leaf" href="https://www.cspro.org/" target="_blank" rel="noreferrer noopener">CCF CSP</a></li>
        <li><a class="leaf" href="https://gamedevfan.cn/" target="_blank" rel="noreferrer noopener">杞欢寮€鍙戝涔犵瑪璁?/a></li>
        <li><a class="leaf" href="https://gitee.com/dashboard/projects" target="_blank" rel="noreferrer noopener">Gitee</a></li>
      </ul>

      <div class="branch" data-target="ai" aria-expanded="false">
        <span class="caret"></span><span>AI 宸ュ叿</span>
      </div>
      <ul class="children" id="ai">
        <li><a class="leaf" href="https://spritesheetgenerator.online/" target="_blank" rel="noreferrer noopener">Spritesheet Generator</a></li>
        <li><a class="leaf" href="https://stablediffusionweb.com/zh-cn" target="_blank" rel="noreferrer noopener">Stable Diffusion Web</a></li>
        <li><a class="leaf" href="https://huggingface.co/" target="_blank" rel="noreferrer noopener">HuggingFace</a></li>
        <li><a class="leaf" href="https://chat.deepseek.com/" target="_blank" rel="noreferrer noopener">DeepSeek Chat</a></li>
        <li><a class="leaf" href="https://bailian.console.aliyun.com/" target="_blank" rel="noreferrer noopener">閫氫箟鍗冮棶</a></li>
        <li><a class="leaf" href="https://www.doubao.com/chat/" target="_blank" rel="noreferrer noopener">璞嗗寘</a></li>
        <li><a class="leaf" href="https://chatgpt.com/" target="_blank" rel="noreferrer noopener">ChatGPT</a></li>
        <li><a class="leaf" href="https://status.openai.com/" target="_blank" rel="noreferrer noopener">OpenAI Status</a></li>
      </ul>

      <div class="branch" data-target="math" aria-expanded="false">
        <span class="caret"></span><span>鏁板涓庤绠楀伐鍏?/span>
      </div>
      <ul class="children" id="math">
        <li><a class="leaf" href="https://oeis.org/" target="_blank" rel="noreferrer noopener">OEIS</a></li>
        <li><a class="leaf" href="https://www.desmos.com/calculator/isyvh0ba7x?lang=zh-CN" target="_blank" rel="noreferrer noopener">Desmos</a></li>
        <li><a class="leaf" href="https://matrixcalc.org/" target="_blank" rel="noreferrer noopener">MatrixCalc</a></li>
      </ul>

      <div class="branch" data-target="game" aria-expanded="false">
        <span class="caret"></span><span>娓告垙涓?Mod 宸ュ叿</span>
      </div>
      <ul class="children" id="game">
        <li><a class="leaf" href="https://www.nexusmods.com/" target="_blank" rel="noreferrer noopener">Nexus Mods</a></li>
        <li><a class="leaf" href="https://store.steampowered.com/?created_account=1" target="_blank" rel="noreferrer noopener">Steam</a></li>
        <li><a class="leaf" href="https://steamdb.info/" target="_blank" rel="noreferrer noopener">SteamDB</a></li>
        <li><a class="leaf" href="https://steampp.net/" target="_blank" rel="noreferrer noopener">Watt Toolkit</a></li>
        <li><a class="leaf" href="https://www.fossic.org/" target="_blank" rel="noreferrer noopener">杩滆鏄熷彿璁哄潧</a></li>
        <li><a class="leaf" href="https://factorio.com/" target="_blank" rel="noreferrer noopener">Factorio</a></li>
        <li><a class="leaf" href="https://wiki.factorio.com/Main_Page/zh" target="_blank" rel="noreferrer noopener">Factorio Wiki</a></li>
        <li><a class="leaf" href="https://noita.wiki.gg/zh/wiki/Noita_Wiki" target="_blank" rel="noreferrer noopener">Noita Wiki</a></li>
        <li><a class="leaf" href="https://kamiheku.github.io/noited/" target="_blank" rel="noreferrer noopener">Noited</a></li>
        <li><a class="leaf" href="https://noitamap.com/?map=regular-main-branch" target="_blank" rel="noreferrer noopener">Noita Map</a></li>
        <li><a class="leaf" href="https://www.noitool.com/info" target="_blank" rel="noreferrer noopener">Noitool</a></li>
        <li><a class="leaf" href="https://www.xiaoheihe.cn/home/" target="_blank" rel="noreferrer noopener">灏忛粦鐩?/a></li>
        <li><a class="leaf" href="https://steampy.com/home" target="_blank" rel="noreferrer noopener">SteamPY</a></li>
        <li><a class="leaf" href="https://playtime-panorama.superserio.us/" target="_blank" rel="noreferrer noopener">Playtime Panorama</a></li>
        <li><a class="leaf" href="https://www.xiaoheihe.cn/app/bbs/home" target="_blank" rel="noreferrer noopener">灏忛粦鐩掕鍧?/a></li>
      </ul>
    </div>
  </aside>`;

  const canvas = document.getElementById('map-bg');
  if (canvas) {
    canvas.insertAdjacentHTML('afterend', html);
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }
})();

