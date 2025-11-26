(function () {
  const toggle = document.getElementById('drawer-toggle');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const openNote = document.getElementById('open-note');
  const modal = document.getElementById('note-modal');
  const modalTitle = document.getElementById('note-title');
  const modalDesc = document.getElementById('note-desc');
  const modalCode = document.getElementById('note-code');
  const modalClose = document.getElementById('note-close');

  const items = [
    {
      title: '浜屽垎鏌ユ壘妯℃澘锛堜笂鐣岋級',
      desc: 'upper_bound 绛変环浜庢壘绗竴涓?> target 鐨勪綅缃紝鍙敤浜庣瓟妗堜簩鍒嗐€?,
      code: `int l = 0, r = n;
while (l < r) {
    int mid = (l + r) >> 1;
    if (a[mid] <= x) l = mid + 1;
    else r = mid;
}
return l;`
    },
    {
      title: '绂绘暎鍖栨妧宸?,
      desc: '鎶婂ぇ鑼冨洿鍊兼槧灏勫埌杩炵画灏忚寖鍥达紝甯哥敤浜庢爲鐘舵暟缁?绾挎鏍戜互鍑忓皬鍐呭瓨銆?,
      code: `vector<int> xs = a;
sort(xs.begin(), xs.end());
xs.erase(unique(xs.begin(), xs.end()), xs.end());
int id = lower_bound(xs.begin(), xs.end(), x) - xs.begin();`
    },
    {
      title: '浜岀淮鍓嶇紑鍜?,
      desc: '棰勫鐞?O(nm)锛屽尯闂存煡璇?O(1)锛屽父鐢ㄤ簬瀛愮煩闃垫眰鍜屻€?,
      code: `int s[N][N];
s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];
// 鏌ヨ (x1,y1)-(x2,y2)
int sum = s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1];`
    },
    {
      title: '婊戝姩绐楀彛鏈€澶у€硷紙鍗曡皟闃熷垪锛?,
      desc: '缁存姢涓€涓崟璋冮€掑噺闃熷垪锛孫(n) 姹傛墍鏈夌獥鍙ｆ渶澶у€笺€?,
      code: `deque<int> q;
for (int i = 0; i < n; i++) {
    while (!q.empty() && a[q.back()] <= a[i]) q.pop_back();
    q.push_back(i);
    if (q.front() <= i - k) q.pop_front();
    if (i >= k - 1) ans.push_back(a[q.front()]);
}`
    },
    {
      title: '鎷撴墤鎺掑簭锛圞ahn锛?,
      desc: '鍩轰簬鍏ュ害鐨?BFS锛屽彲妫€娴?DAG 鎴栧畨鎺掍换鍔￠『搴忋€?,
      code: `queue<int> q;
for (int i = 0; i < n; i++)
    if (deg[i] == 0) q.push(i);
while (!q.empty()) {
    int u = q.front(); q.pop();
    topo.push_back(u);
    for (int v : g[u])
        if (--deg[v] == 0) q.push(v);
}`
    },
    {
      title: '鍖洪棿鍚堝苟鎶€宸?,
      desc: '鎺掑簭鍚庢壂鎻忥紝鍚堝苟閲嶅彔鍖洪棿锛屽父鐢ㄤ簬鏃ョ▼/瑕嗙洊闂銆?,
      code: `sort(seg.begin(), seg.end());
vector<pair<int,int>> res;
for (auto [l, r] : seg) {
    if (res.empty() || l > res.back().second)
        res.push_back({l, r});
    else
        res.back().second = max(res.back().second, r);
}`
    },
    {
      title: 'Floyd-Warshall 鍏ㄦ簮鏈€鐭矾',
      desc: '涓夊眰寰幆锛岄€傜敤浜庣偣鏁拌緝灏忕殑鍥撅紝鏀寔璐熸潈浣嗕笉鑳芥湁璐熺幆銆?,
      code: `for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);`
    },
    {
      title: '蹇€熼€夋嫨锛圦uickSelect锛?,
      desc: '鏈熸湜 O(n) 鎵剧 k 灏忥紝鍒嗗尯鎬濊矾涓庡揩閫熸帓搴忕浉鍚屻€?,
      code: `int qselect(int l, int r, int k) {
    int x = a[(l + r) / 2], i = l, j = r;
    while (i <= j) {
        while (a[i] < x) i++;
        while (a[j] > x) j--;
        if (i <= j) swap(a[i++], a[j--]);
    }
    if (k <= j) return qselect(l, j, k);
    if (k >= i) return qselect(i, r, k);
    return a[k];
}`
    },
    {
      title: '鏈€灏忕敓鎴愭爲 Prim锛堝爢浼樺寲锛?,
      desc: '閫傚悎绋犲瘑鍥撅紝鍒╃敤鍫嗘瘡娆″姞鍏ユ渶杩戠偣銆?,
      code: `priority_queue<P, vector<P>, greater<P>> pq;
vector<int> dist(n, INF), vis(n);
dist[0] = 0;
pq.push({0, 0});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (vis[u]) continue;
    vis[u] = 1;
    for (auto [v, w] : g[u])
        if (w < dist[v]) {
            dist[v] = w;
            pq.push({w, v});
        }
}`
    },
    {
      title: 'LIS O(n log n)',
      desc: '璐績 + 浜屽垎锛岀淮鎶ゆ渶灏忕粨灏惧€煎垪琛ㄣ€?,
      code: `vector<int> d;
for (int x : a) {
    auto it = lower_bound(d.begin(), d.end(), x);
    if (it == d.end()) d.push_back(x);
    else *it = x;
}
int lis = d.size();`
    },
    {
      title: 'Trie 瀛楀吀鏍?,
      desc: '鍓嶇紑鍖归厤銆佽瘝棰戠粺璁°€佸瓧绗︿覆闆嗗悎鐨勫父鐢ㄧ粨鏋勩€?,
      code: `struct Node { int nxt[26]; bool end; } tr[N];
void insert(const string& s) {
    int u = 0;
    for (char c: s) {
        int v = c - 'a';
        if (!tr[u].nxt[v]) tr[u].nxt[v] = ++cnt;
        u = tr[u].nxt[v];
    }
    tr[u].end = true;
}`
    },
    {
      title: 'RAII 璧勬簮绠＄悊',
      desc: '鏋勯€犺幏鍙栬祫婧愶紝鏋愭瀯閲婃斁锛屽紓甯稿畨鍏紙濡?std::lock_guard锛夈€?,
      code: `struct File {
    FILE* fp;
    File(const char* name) : fp(fopen(name, "r")) {}
    ~File() { if (fp) fclose(fp); }
};`
    },
    {
      title: 'Rule of Five / 涓夋硶鍒?,
      desc: '鑷畾涔夎祫婧愮鐞嗘椂鎴愬瀹炵幇鎷疯礉/绉诲姩/鏋愭瀯锛岄伩鍏嶉殣寮忕敓鎴愬鑷磋祫婧愰噸澶嶉噴鏀俱€?,
      code: `struct S {
    S(const S&) = delete;
    S& operator=(const S&) = delete;
    S(S&&) = default;
    S& operator=(S&&) = default;
    ~S() = default;
};`
    },
    {
      title: 'emplace 浼樹簬 push_back',
      desc: 'emplace_* 灏卞湴鏋勯€犲璞★紝閬垮厤涓嶅繀瑕佺殑鎷疯礉鎴栫Щ鍔ㄣ€?,
      code: `vector<pair<int,string>> v;
v.emplace_back(1, "hi"); // 鐩存帴鏋勯€燻
    },
    {
      title: 'std::move 鍙槸寮哄埗杞崲',
      desc: 'std::move 骞朵笉绉诲姩瀵硅薄锛屽彧鎶婅〃杈惧紡鍙樹负鍙冲€硷紝鏄惁绉诲姩鐢辩被鍨嬪喅瀹氥€?,
      code: `string a = "hello";
string b = std::move(a); // 鍙戠敓绉诲姩
// a 澶勪簬宸茬Щ璧颁絾鍙敤鐨勭姸鎬乣
    },
    {
      title: 'if/switch 鍒濆鍖栬娉?,
      desc: 'C++17 鏀寔鍦ㄦ潯浠跺墠鍒濆鍖栧彉閲忥紝缂╁皬浣滅敤鍩熸洿瀹夊叏銆?,
      code: `if (auto it = mp.find(k); it != mp.end()) {
    doSomething(it->second);
}`
    },
    {
      title: '鏅鸿兘鎸囬拡寰幆寮曠敤',
      desc: 'shared_ptr 浜掔浉鎸佹湁浼氬鑷存硠婕忥紝鐢?weak_ptr 鎵撶牬寰幆銆?,
      code: `struct A { shared_ptr<A> next; };
auto a = make_shared<A>();
auto b = make_shared<A>();
a->next = b;
b->next = a; // 寰幆寮曠敤锛屾硠婕廯
    },
    {
      title: '瀹岀編杞彂',
      desc: 'std::forward 淇濈暀鍊肩被鍒紙宸?鍙冲€硷級锛岄伩鍏嶉敊璇噸杞姐€?,
      code: `template<class T>
void wrapper(T&& x) {
    foo(std::forward<T>(x));
}`
    },
    {
      title: 'std::optional 琛ㄧず鍙┖',
      desc: '姣旇繑鍥炴寚閽堟洿瀹夊叏鐨勫彲閫夎繑鍥炵被鍨嬶紝閬垮厤 magic value銆?,
      code: `optional<int> f(bool ok) {
    if (ok) return 42;
    return nullopt;
}`
    },
    {
      title: 'std::variant 浠ｆ浛 union',
      desc: '绫诲瀷瀹夊叏鐨勮仈鍚堜綋锛屽彲鐢?std::visit 璁块棶涓嶅悓绫诲瀷銆?,
      code: `variant<int, string> v = "hi";
visit([](auto& x){ cout << x; }, v);`
    },
    {
      title: '鍙冲€煎紩鐢ㄤ笌绉诲姩',
      desc: '鎺ユ敹鍙冲€煎紩鐢ㄥ悗鐢?std::move 杞氦锛屽噺灏戞嫹璐濄€?,
      code: `void set(std::string&& s){
    name = std::move(s);
}
set(std::string("hi"));`
    },
    {
      title: 'constexpr 灏忔妧宸?,
      desc: 'constexpr 鍑芥暟鍙紪璇戞湡璁＄畻锛屼繚鎸佹棤鍓綔鐢ㄣ€?,
      code: `constexpr int sq(int x){ return x*x; }
static_assert(sq(5)==25);`
    },
    {
      title: 'Lambda 鎹曡幏鍧戠偣',
      desc: '鎸夊€兼崟鑾蜂笉浼氬弽鏄犲閮ㄥ彉鍖栵紝闇€鎸夊紩鐢ㄦ垨浣跨敤 mutable銆?,
      code: `int x=0;
auto f=[&]{ ++x; };
f(); // x == 1`
    },
    {
      title: '骞舵煡闆嗭紙璺緞鍘嬬缉锛?,
      desc: '璺緞鍘嬬缉 + 鎸夌З鍚堝苟锛岃繎浼?O(伪(n))銆?,
      code: `int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }
void unite(int a,int b){
    a=find(a); b=find(b);
    if(a!=b) p[a]=b;
}`
    },
    {
      title: 'KMP 鍓嶇紑鍑芥暟',
      desc: 'pi[i] 涓烘渶闀跨湡鍓嶅悗缂€闀垮害锛岀嚎鎬ч澶勭悊銆?,
      code: `for(int i=1;i<n;i++){
    int j=pi[i-1];
    while(j>0 && s[i]!=s[j]) j=pi[j-1];
    if(s[i]==s[j]) j++;
    pi[i]=j;
}`
    },
    {
      title: '蹇€熷箓妯℃澘',
      desc: '浜岃繘鍒跺垎瑙ｆ寚鏁帮紝O(log n) 璁＄畻 a^b mod m銆?,
      code: `long long fpow(long long a,long long b,long long m){
    long long r=1;
    while(b){
        if(b&1) r=r*a%m;
        a=a*a%m;
        b>>=1;
    }
    return r;
}`
    },
    {
      title: 'Dijkstra 鏈€鐭矾',
      desc: '闈炶礋鏉冨浘鏈€鐭矾锛屽爢浼樺寲鏉惧紱杈广€?,
      code: `priority_queue<P,vector<P>,greater<P>> pq;
d[s]=0; pq.push({0,s});
while(!pq.empty()){
    auto [du,u]=pq.top(); pq.pop();
    if(du!=d[u]) continue;
    for(auto [v,w]:g[u])
        if(du+w<d[v]){
            d[v]=du+w;
            pq.push({d[v],v});
        }
}`
    },
  ];

  const openDrawer = () => {
    if (!drawer || !backdrop) return;
    drawer.classList.add('open');
    backdrop.classList.add('open');
  };
  const closeDrawer = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
  };

  toggle?.addEventListener('click', openDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  document.querySelectorAll('.drawer-tree .branch').forEach((branch) => {
    branch.addEventListener('click', () => {
      const targetId = branch.getAttribute('data-target');
      const panel = targetId ? document.getElementById(targetId) : null;
      const expanded = branch.getAttribute('aria-expanded') === 'true';
      branch.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) panel.classList.toggle('open', !expanded);
    });
  });

  const pickRandom = () => items[Math.floor(Math.random() * items.length)];
  function openNoteModal() {
    if (!modal || !modalTitle || !modalDesc || !modalCode) return;
    const pick = pickRandom();
    modalTitle.textContent = pick.title;
    modalDesc.textContent = pick.desc;
    modalCode.textContent = pick.code;
    modal.classList.add('open');
  }
  function closeNoteModal() {
    modal?.classList.remove('open');
  }
  openNote?.addEventListener('click', (e) => { e.preventDefault(); openNoteModal(); });
  modalClose?.addEventListener('click', closeNoteModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeNoteModal(); });
})();

