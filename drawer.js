(function () {
  const html = `
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="drawer">
    <h3>导航</h3>
    <a href="index.html">主页</a>
    <a href="profile.html">个人介绍</a>
    <a href="hobbies.html">学习方向</a>
    <a href="noita-records.html">Noita</a>
    <h3>C++ 随机笔记</h3>
    <a href="javascript:void(0)" id="open-note">打开随机笔记</a>
    <h3>工具与常用站点</h3>
    <div class="drawer-tree" id="tools-tree">
      <div class="branch" data-target="dev" aria-expanded="false">
        <span class="caret"></span><span>编程与开发工具</span>
      </div>
      <ul class="children" id="dev">
        <li><a class="leaf" href="https://github.com/" target="_blank" rel="noreferrer noopener">GitHub</a></li>
        <li><a class="leaf" href="https://oi-wiki.org/" target="_blank" rel="noreferrer noopener">OI Wiki</a></li>
        <li><a class="leaf" href="https://www.luogu.com.cn/" target="_blank" rel="noreferrer noopener">洛谷</a></li>
        <li><a class="leaf" href="https://leetcode.cn/leetbook/" target="_blank" rel="noreferrer noopener">LeetBook</a></li>
        <li><a class="leaf" href="https://visualgo.net/zh" target="_blank" rel="noreferrer noopener">VisuAlgo</a></li>
        <li><a class="leaf" href="https://en.cppreference.com/w/" target="_blank" rel="noreferrer noopener">C++ reference</a></li>
        <li><a class="leaf" href="https://learn.microsoft.com/zh-cn/dotnet/csharp/" target="_blank" rel="noreferrer noopener">C# 文档</a></li>
        <li><a class="leaf" href="https://docs.godotengine.org/en/stable/" target="_blank" rel="noreferrer noopener">Godot 文档</a></li>
        <li><a class="leaf" href="https://www.stroustrup.com/" target="_blank" rel="noreferrer noopener">Bjarne Stroustrup</a></li>
        <li><a class="leaf" href="https://guidebook.hustunique.com/" target="_blank" rel="noreferrer noopener">联创团队指北</a></li>
        <li><a class="leaf" href="https://liaoxuefeng.com/index.html" target="_blank" rel="noreferrer noopener">廖雪峰</a></li>
        <li><a class="leaf" href="https://www.cspro.org/" target="_blank" rel="noreferrer noopener">CCF CSP</a></li>
        <li><a class="leaf" href="https://gamedevfan.cn/" target="_blank" rel="noreferrer noopener">软件开发学习笔记</a></li>
        <li><a class="leaf" href="https://gitee.com/dashboard/projects" target="_blank" rel="noreferrer noopener">Gitee</a></li>
      </ul>

      <div class="branch" data-target="ai" aria-expanded="false">
        <span class="caret"></span><span>AI 工具</span>
      </div>
      <ul class="children" id="ai">
        <li><a class="leaf" href="https://spritesheetgenerator.online/" target="_blank" rel="noreferrer noopener">Spritesheet Generator</a></li>
        <li><a class="leaf" href="https://stablediffusionweb.com/zh-cn" target="_blank" rel="noreferrer noopener">Stable Diffusion Web</a></li>
        <li><a class="leaf" href="https://huggingface.co/" target="_blank" rel="noreferrer noopener">HuggingFace</a></li>
        <li><a class="leaf" href="https://chat.deepseek.com/" target="_blank" rel="noreferrer noopener">DeepSeek Chat</a></li>
        <li><a class="leaf" href="https://bailian.console.aliyun.com/" target="_blank" rel="noreferrer noopener">通义千问</a></li>
        <li><a class="leaf" href="https://www.doubao.com/chat/" target="_blank" rel="noreferrer noopener">豆包</a></li>
        <li><a class="leaf" href="https://chatgpt.com/" target="_blank" rel="noreferrer noopener">ChatGPT</a></li>
        <li><a class="leaf" href="https://status.openai.com/" target="_blank" rel="noreferrer noopener">OpenAI Status</a></li>
      </ul>

      <div class="branch" data-target="math" aria-expanded="false">
        <span class="caret"></span><span>数学与计算工具</span>
      </div>
      <ul class="children" id="math">
        <li><a class="leaf" href="https://oeis.org/" target="_blank" rel="noreferrer noopener">OEIS</a></li>
        <li><a class="leaf" href="https://www.desmos.com/calculator/isyvh0ba7x?lang=zh-CN" target="_blank" rel="noreferrer noopener">Desmos</a></li>
        <li><a class="leaf" href="https://matrixcalc.org/" target="_blank" rel="noreferrer noopener">MatrixCalc</a></li>
      </ul>

      <div class="branch" data-target="game" aria-expanded="false">
        <span class="caret"></span><span>游戏 / Mod 工具</span>
      </div>
      <ul class="children" id="game">
        <li><a class="leaf" href="https://www.nexusmods.com/" target="_blank" rel="noreferrer noopener">Nexus Mods</a></li>
        <li><a class="leaf" href="https://store.steampowered.com/?created_account=1" target="_blank" rel="noreferrer noopener">Steam</a></li>
        <li><a class="leaf" href="https://steamdb.info/" target="_blank" rel="noreferrer noopener">SteamDB</a></li>
        <li><a class="leaf" href="https://steampp.net/" target="_blank" rel="noreferrer noopener">Watt Toolkit</a></li>
        <li><a class="leaf" href="https://www.fossic.org/" target="_blank" rel="noreferrer noopener">远行星号论坛</a></li>
        <li><a class="leaf" href="https://factorio.com/" target="_blank" rel="noreferrer noopener">Factorio</a></li>
        <li><a class="leaf" href="https://wiki.factorio.com/Main_Page/zh" target="_blank" rel="noreferrer noopener">Factorio Wiki</a></li>
        <li><a class="leaf" href="https://noita.wiki.gg/zh/wiki/Noita_Wiki" target="_blank" rel="noreferrer noopener">Noita Wiki</a></li>
        <li><a class="leaf" href="https://kamiheku.github.io/noited/" target="_blank" rel="noreferrer noopener">Noited</a></li>
        <li><a class="leaf" href="https://noitamap.com/?map=regular-main-branch" target="_blank" rel="noreferrer noopener">Noita Map</a></li>
        <li><a class="leaf" href="https://www.noitool.com/info" target="_blank" rel="noreferrer noopener">Noitool</a></li>
        <li><a class="leaf" href="https://www.xiaoheihe.cn/home/" target="_blank" rel="noreferrer noopener">小黑盒</a></li>
        <li><a class="leaf" href="https://steampy.com/home" target="_blank" rel="noreferrer noopener">SteamPY</a></li>
        <li><a class="leaf" href="https://playtime-panorama.superserio.us/" target="_blank" rel="noreferrer noopener">Playtime Panorama</a></li>
        <li><a class="leaf" href="https://www.xiaoheihe.cn/app/bbs/home" target="_blank" rel="noreferrer noopener">小黑盒论坛</a></li>
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
