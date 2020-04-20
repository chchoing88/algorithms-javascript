class Graph {
  vertices: number;
  edges: number;
  adj: number[][];
  marked: boolean[];

  constructor(v: number) {
    this.vertices = v;
    this.edges = 0;

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
}
