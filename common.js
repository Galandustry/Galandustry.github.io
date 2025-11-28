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
      title: '二分查找模板（上界）',
      desc: 'upper_bound 等价于找第一个 > target 的位置，可用于答案二分。',
      code: `int l = 0, r = n;
while (l < r) {
    int mid = (l + r) >> 1;
    if (a[mid] <= x) l = mid + 1;
    else r = mid;
}
return l;`
    },
    {
      title: '离散化技巧',
      desc: '把大范围值映射到连续小范围，常用于树状数组/线段树以减小内存。',
      code: `vector<int> xs = a;
sort(xs.begin(), xs.end());
xs.erase(unique(xs.begin(), xs.end()), xs.end());
int id = lower_bound(xs.begin(), xs.end(), x) - xs.begin();`
    },
    {
      title: '二维前缀和',
      desc: '预处理 O(nm)，区间查询 O(1)，常用于子矩阵求和。',
      code: `int s[N][N];
s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];
// 查询 (x1,y1)-(x2,y2)
int sum = s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1];`
    },
    {
      title: '滑动窗口最大值（单调队列）',
      desc: '维护一个单调递减队列，O(n) 求所有窗口最大值。',
      code: `deque<int> q;
for (int i = 0; i < n; i++) {
    while (!q.empty() && a[q.back()] <= a[i]) q.pop_back();
    q.push_back(i);
    if (q.front() <= i - k) q.pop_front();
    if (i >= k - 1) ans.push_back(a[q.front()]);
}`
    },
    {
      title: '拓扑排序（Kahn）',
      desc: '基于入度的 BFS，可检测 DAG 或安排任务顺序。',
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
      title: '区间合并技巧',
      desc: '排序后扫描，合并重叠区间，常用于日程/覆盖问题。',
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
      title: 'Floyd-Warshall 全源最短路',
      desc: '三层循环，适用于点数较小的图，支持负权但不能有负环。',
      code: `for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);`
    },
    {
      title: '快速选择（QuickSelect）',
      desc: '期望 O(n) 找第 k 小，分区思路与快速排序相同。',
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
      title: '最小生成树 Prim（堆优化）',
      desc: '适合稠密图，利用堆每次加入最近点。',
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
      desc: '贪心 + 二分，维护最小结尾值列表。',
      code: `vector<int> d;
for (int x : a) {
    auto it = lower_bound(d.begin(), d.end(), x);
    if (it == d.end()) d.push_back(x);
    else *it = x;
}
int lis = d.size();`
    },
    {
      title: 'Trie 字典树',
      desc: '前缀匹配、词频统计、字符串集合的常用结构。',
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
      title: 'RAII 资源管理',
      desc: '构造获取资源，析构释放，异常安全（如 std::lock_guard）。',
      code: `struct File {
    FILE* fp;
    File(const char* name) : fp(fopen(name, "r")) {}
    ~File() { if (fp) fclose(fp); }
};`
    },
    {
      title: 'Rule of Five / 三法则',
      desc: '自定义资源管理时成对实现拷贝/移动/析构，避免重复释放。',
      code: `struct S {
    S(const S&) = delete;
    S& operator=(const S&) = delete;
    S(S&&) = default;
    S& operator=(S&&) = default;
    ~S() = default;
};`
    },
    {
      title: 'emplace 优于 push_back',
      desc: 'emplace_* 就地构造对象，避免不必要的拷贝或移动。',
      code: `vector<pair<int,string>> v;
v.emplace_back(1, "hi"); // 直接构造`
    },
    {
      title: 'std::move 只是强制转换',
      desc: 'std::move 不移动对象，只把表达式变为右值，移动与否由类型决定。',
      code: `string a = "hello";
string b = std::move(a); // 发生移动
// a 处于已移走但可用的状态`
    },
    {
      title: 'if/switch 初始化语句',
      desc: 'C++17 支持在条件前初始化变量，缩小作用域更安全。',
      code: `if (auto it = mp.find(k); it != mp.end()) {
    doSomething(it->second);
}`
    },
    {
      title: '智能指针循环引用',
      desc: 'shared_ptr 互相持有会导致泄漏，用 weak_ptr 打破循环。',
      code: `struct A { shared_ptr<A> next; };
auto a = make_shared<A>();
auto b = make_shared<A>();
a->next = b;
b->next = a; // 循环引用，泄漏`
    },
    {
      title: '完美转发',
      desc: 'std::forward 保留值类别（左/右值），避免错误重载。',
      code: `template<class T>
void wrapper(T&& x) {
    foo(std::forward<T>(x));
}`
    },
    {
      title: 'std::optional 表示可空',
      desc: '比返回指针更安全的可选返回类型，避免 magic value。',
      code: `optional<int> f(bool ok) {
    if (ok) return 42;
    return nullopt;
}`
    },
    {
      title: 'std::variant 代替 union',
      desc: '类型安全的联合体，可用 std::visit 访问不同类型。',
      code: `variant<int, string> v = "hi";
visit([](auto& x){ cout << x; }, v);`
    },
    {
      title: '右值引用与移动',
      desc: '接收右值引用后再 std::move 转交，减少拷贝。',
      code: `void set(std::string&& s){
    name = std::move(s);
}
set(std::string("hi"));`
    },
    {
      title: 'constexpr 小技巧',
      desc: 'constexpr 函数可在编译期计算，保持无副作用。',
      code: `constexpr int sq(int x){ return x*x; }
static_assert(sq(5)==25);`
    },
    {
      title: 'Lambda 捕获坑点',
      desc: '按值捕获不会反映外部变化，需按引用或使用 mutable。',
      code: `int x=0;
auto f=[&]{ ++x; };
f(); // x == 1`
    },
    {
      title: '并查集（路径压缩）',
      desc: '路径压缩 + 按秩合并，近似 O(α(n))。',
      code: `int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }
void unite(int a,int b){
    a=find(a); b=find(b);
    if(a!=b) p[a]=b;
}`
    },
    {
      title: 'KMP 前缀函数',
      desc: 'pi[i] 为最长真前后缀长度，线性预处理。',
      code: `for(int i=1;i<n;i++){
    int j=pi[i-1];
    while(j>0 && s[i]!=s[j]) j=pi[j-1];
    if(s[i]==s[j]) j++;
    pi[i]=j;
}`
    },
    {
      title: '快速幂模板',
      desc: '二进制分解指数，O(log n) 计算 a^b mod m。',
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
      title: 'Dijkstra 最短路',
      desc: '非负权图最短路，堆优化松弛边。',
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
