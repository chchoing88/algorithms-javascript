class Graph {
  vertices: number;
  edges: number;
  adj: number[][];
  marked: boolean[];
  edgesTo: number[];

  constructor(v: number) {
    this.vertices = v;
    this.edges = 0;
    this.edgesTo = [];

    this.adj = new Array(v);
    for (let i = 0; i < this.adj.length; i++) {
      this.adj[i] = [];
    }

    // 탐색을 했는지 안했는지 확인하기 위해서
    this.marked = [];
    for (let i = 0; i < this.adj.length; i++) {
      this.marked[i] = false;
    }
  }

  addEdge(v: number, w: number) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }

  showGraph() {
    console.log("this.adj", this.adj);
    this.adj.forEach((verticeList, index) => {
      console.log(`${index} -> `);
      verticeList.forEach((vertice) => {
        if (vertice !== undefined) {
          console.log(`${vertice}`);
        }
      });
      console.log("\n");
    });
  }

  // 재귀는 곧 돌아와서 다시 할일이 있기 때문에 사용한다.
  // 순서 0 -> true, this.adj[0] = 1, this.dfs(1), 1 -> true,...
  dfs(v: number) {
    this.marked[v] = true;
    if (this.marked[v] !== undefined) {
      console.log(`Visited vertex: ${v}`);
    }

    for (let w of this.adj[v]) {
      // 이미 방문 했던 vertex는 무시한다.
      if (!this.marked[w]) {
        this.dfs(w);
      }
    }
  }

  bfs(s: number) {
    const queue = [] as number[];
    this.marked[s] = true;
    queue.push(s);

    while (queue.length > 0) {
      const v = queue.shift(); // 큐에서 가져옴
      if (v !== undefined) {
        console.log(`Visited vertex: ${v}`);

        for (let w of this.adj[v]) {
          if (!this.marked[w]) {
            // 이미 방문하지 않았던 w 정점에 대해서
            this.edgesTo[w] = v; // 경로를 찾을때 간선 정보를 유지할 배열
            this.marked[w] = true; // 정점에 도달
            queue.push(w); // 방문한 정점에서 가장 인접한 레벨의 정점들을 큐에 넣어둔다.
          }
        }
      }
    }
  }

  pathTo(v: number) {
    const source = 0;
    // 너비 우선 검색을 우선 실행한다.
    // 간선 정보 수집 및 marked 수집.
    this.bfs(0);

    if (!this.hasPathTo(v)) {
      return undefined;
    }

    const path = [];
    for (let i = v; i !== source; i = this.edgesTo[i]) {
      // 여기서 this.edgesTo는 다음과 같다.
      // const g = new Graph(5)
      // g.addEdge(0, 1)
      // g.addEdge(0, 2)
      // g.addEdge(1, 3)
      // g.addEdge(2, 4)
      // 1 - 0, 2 - 0, 3 - 1, 4 - 2 간선 정보
      path.push(i);
    }
    path.push(source);
    return path;
  }

  hasPathTo(v: number) {
    return this.marked[v];
  }

  topSort() {
    const stack: number[] = [];
    const visited = [];
    for (let i = 0; i < this.vertices; i++) {
      visited[i] = false;
    }

    for (let i = 0; i < this.vertices; i++) {
      if (visited[i] == false) {
        this.topSortHelper(i, visited, stack);
      }
    }
    let length = stack.length;
    for (let i = 0; i < length; i++) {
      console.log(stack.pop());
    }
  }

  topSortHelper(v: number, visited: boolean[], stack: number[]) {
    visited[v] = true;
    for (var w of this.adj[v]) {
      if (!visited[w]) {
        this.topSortHelper(w, visited, stack);
      }
    }
    stack.push(v);
  }
}
